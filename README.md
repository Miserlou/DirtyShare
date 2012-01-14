![logo](http://i.imgur.com/SKHiX.png)

# DirtyShare - Pure Javascript Peer to Peer Filesharing with NodeJS and Socket.io

## Rich Jones - rich@[gun.io](http://gun.io)

### Version 0.1.0

DirtyShare is a "Peer to Peer" filesharing system written in pure Javascript with Socket.io and Node.js.

It's called DirtyShare because it's dirty as hell across the whole stack, from the concept to the code to the use case.

## About

File transfers in DirtyShare happen from a host client to a peer client, in chunks which go through the webserver over WebSockets provided
by Socket.IO. The web server only holds onto the data while it is being received and transmitted through it, so there is
no data ever permanently stored on the web server. This makes it perfect for sending dirty pictures!

Ideally, the WebSockets will only be used to establish the P2P connections which will go over the HTML5 PeerConnection
object, however, no modern browsers support this feature yet. Hopefully, it will become available within the next 6
months or so, and we will be ready for it 

Let's make a purely browser based, ad-free, Free and Open Source private filesharing system!

## Demo

[There is a live demo here](http://share.gun.io), although it may go down at any time.

## Mailing List

If you'd like to discuss P2P web applications further, send an email to 

> webp2p@librelist.com

and you'll be part of the discussion mailing list! [(Archives here.)](http://librelist.com/browser/webp2p/)

## TODO

* Work on doing proper PeerConnection based transfers when builds are available.
* Data storgae should use FileSystem instead of the DOM. Firefox need to get their ass in gear on this one. 
* Clean it up. It's a little dirty.
* Send as little data as possible.
* Find the optimal size for chunking. Currently set at 64Kb - this is arbitrary.
* Security, of any kind.
* Drag and drop of files, so my roommate shuts up about it.

## License

For now, consider this code to be under the Affero GNU General Public License. I am willing to relicense it under the
BSD/MIT/Apache license, I simply ask that you email me and tell me why. I'll almost certainly agree.

Patches graciously accepted!
