**behind the scenes!** *Feel free to ignore this, but if you're craving that sweet sweet knowledge, read on.*

# Hey, what's webpack?

OK, so. First things first: Javascript. Javascript is a programming language that runs in your browser, but it can also run on other kinds of computers (like servers). This makes sense -- if a browser can do it, a server can do it too! 
However, browsers and servers are different. They need different things.

Imagine you're a server. You're a computer. You're reading a file. And that file says, "Hey I need to reference another file, it's over there, could you grab it for me?"
You can do that! You're in your own house. You have access to the "file system" (i.e. your folders and stuff).

However, when you're using the internet, your browser only knows about the files that it gets sent. If you're a browser and a file you're reading says "hey we need another file", you'll say "um excuse me, you're the one who sent me THESE files, this is all I HAVE."

This is a bit of a drag, because breaking your javascript into multiple files is a great way to keep your code organized and keep your life from sprialing into chaos. 

To make matters worse, people have been _adding new cool stuff to javascript_, and we all want to _use_ that cool new stuff, but not everyone is using a browser that knows how to _read_ that cool stuff.

This is where webpack and babel come in. 


### Wait what's babel?

Babel is a tool to turn _new fancy javascript_ into _plain, compatible-with-everything javascript_ (within reason). I decided to use it because I wanted to introduce Object Oriented Programming, and the new syntax for that is _way_ easier than the old syntax. More on that at notes/andioop.md

To learn more about Babel (which is very powerful, and which we are only using a teaspoon of), check out [their website](https://babeljs.io/).

### Ok but I didnt ask about that, I asked about webpack.

Fair!

Webpack is used to compile assets. What that means is: Webpack takes files, does stuff to them, and saves the new versions somewhere else. Theoretically, it does stuff to make them browser-friendly (hence _Web_ pack), but it doesn't actually care. You add programs to tell it to do all kinds of weird stuff.

* "turn all my image files upside down", you might say. 
* "Take all the line breaks out of my CSS" is a popular one, because it's an easy way to make a file a little bit smaller.
* "Replace the word 'PLACEHOLDER' with today's date, in all of my HTML files."

But mostly, webpack deals with bundling Javascript, because, as I mentioned, browsers really prefer to get their javascript all in one file.

In the case of our javascript, it gathers up all our files and smashes them into one file (called an "entry" or an "entry point", because it's the starting point for all our other requirements). Which isn't much -- we could do the same thing with copy/paste if we wanted to. But webpack is smarter than us, and we have better things to do anyway. 

For example, at the top of most files here, we import a file called 'constants.js'. Instead of doing that, we could just copy/paste the object in the constants file into these other files. But then, when we smashed the files all together, we'd have like five copies of that object. It's a drag! Webpack does something called "tree shaking" to make sure it doesn't generate a bunch of duplicate code.

Webpack on its own really doesn't do much, so we _add_ things to Webpack to make it fancier. For example, we added "babel-loader", which tells Webpack, "hey, before you smash all of our javascript files into one file, you need to know, it has fancy new javascript features and someone needs to convert that into browser-friendly code. Otherwise, you're not even going to understand how to smash them together. We need you to ask Babel to translate them first."

Does that make sense
If not I will not be offended
