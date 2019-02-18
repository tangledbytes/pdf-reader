# PDF Reader

This PDF reader is in form of a web application and can be used to read any PDF document.<br/>
It depends on pdf.js developed by mozilla.

The reader works well with every reader and gives the basics such as :
1. Navigation to any page
2. Adjusting scale of the page (Default is 2)

It still misses some basic features such as navigation to the bookmarks, links within the PDF and also misses the feature to
create a bookmark. Feel free to fork the project and add the missing features!

## How it works

NOTE: It is very important to run the application through a server (any live server will alos serve the purpose) or else
the app will report error as pdf.js uses Fetch API to fetch documents and fetch works with CORS enabled.

How to use:
1. Make sure the PDF is in Docs folder of this web application
2. Choose file from the input option given below
3. Submit it!

You are ready to use the viewer!

## Here are some ScreenShots of it
![ss1](https://user-images.githubusercontent.com/45818886/52954190-88449480-33af-11e9-861c-923c72d79967.png)
![ss2](https://user-images.githubusercontent.com/45818886/52954197-8f6ba280-33af-11e9-9327-791160aee7f0.png)
