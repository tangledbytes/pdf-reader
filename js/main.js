const controller = (function(){

    let pdfDoc = null,
    pageNum = 1,
    pageIsRendering = false,
    pageNumIsPending = null,
    scale = 2,
    url = '../Docs/Beginning Node.js.pdf';
    const canvas = document.querySelector('#pdf-render'),
        ctx = canvas.getContext('2d');

    const GetURL = function(link){
        url = link;
    }

    const setupEventListeners = () => {
        // For Previous page
        document.getElementById('prev-page').addEventListener('click', displayPDFfuncs().onPrevPage);
        document.addEventListener('keydown', function(event){
            if(event.keyCode === 37 || event.which === 37)
                displayPDFfuncs().onPrevPage();
        });

        // For Next page
        document.getElementById('next-page').addEventListener('click', displayPDFfuncs().onNextPage);
        document.addEventListener('keydown', function(event){
            if(event.keyCode === 39 || event.which === 39)
                displayPDFfuncs().onNextPage();
        });

        // For scale adjustment
        document.querySelector('.scale-btn').addEventListener('click', setScale);
        document.querySelector('.scale').addEventListener('keypress', function(event){
            if(event.keyCode === 13 || event.which === 13)
            {
                setScale();
            }
        });

        // For Navigation
        document.getElementById('page-num').addEventListener('keypress', function(event){
            if(event.keyCode === 13 || event.which === 13)
            {
                navigate();
            }
        });
    }

    const setScale = function(){
        scale = Number(document.querySelector('.scale').value);
        displayPDF(displayPDFfuncs().renderPage);
        // Clear the field
        document.querySelector('.scale').value = '';
    }

    const displayPDFfuncs = function() {
        // Render the page
        const renderPage = num => {
            pageIsRendering = true;

            // Get the page 
            pdfDoc.getPage(num).then(page => {
                const viewport = page.getViewport({ scale: scale});
                canvas.height = viewport.height;
                canvas.width = viewport.width;

                const renderCtx = {
                    canvasContext: ctx,
                    viewport: viewport
                }

                page.render(renderCtx).promise.then(pdfDoc_ => {
                    pageIsRendering = false;

                    if(pageNumIsPending !== null){
                        renderPage(pageNumIsPending);
                        pageNumIsPending = null;
                    }
                });

                // Output current page 

                document.querySelector('#page-num').value = num;
            })

        };

        function queueRenderPage(num) {
            if (pageIsRendering) {
              pageNumPending = num;
            } else {
              renderPage(num);
            }
        };

        //Display previous page
        function onPrevPage() {
            if (pageNum <= 1) {
              return;
            }
            pageNum--;
            queueRenderPage(pageNum);
        };
        
        // Display next page
        function onNextPage() {
            if (pageNum >= pdfDoc.numPages) {
              return;
            }
            pageNum++;
            queueRenderPage(pageNum);
        };

        return {
            onNextPage,
            onPrevPage,
            renderPage,
            queueRenderPage
        }
    }

    const displayPDF = (renderPage) => {
        // Get the document
        pdfjsLib.getDocument(url).promise.then(pdfDoc_ => {
            pdfDoc = pdfDoc_;        
            document.querySelector('#page-count').textContent = pdfDoc.numPages;
            renderPage(pageNum);
        });
    }

    const navigate = function(){
        pageNum = Number(document.getElementById('page-num').value);
        if (pageNum && pageNum <= pdfDoc.numPages && pageNum >= 1){
            displayPDFfuncs().queueRenderPage(pageNum);
        }
        else{
            document.getElementById('page-num').value = '';
        }
    }    

    return {
        initate: function(){
            GetURL('../Docs/' + window.location.href.split('=')[1].replace('+', ' '));
            setupEventListeners();
            displayPDF(displayPDFfuncs().renderPage);
        }
    }
})();

window.onload = controller.initate;