!function(e){var t={};function n(a){if(t[a])return t[a].exports;var s=t[a]={i:a,l:!1,exports:{}};return e[a].call(s.exports,s,s.exports,n),s.l=!0,s.exports}n.m=e,n.c=t,n.d=function(e,t,a){n.o(e,t)||Object.defineProperty(e,t,{enumerable:!0,get:a})},n.r=function(e){"undefined"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(e,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(e,"__esModule",{value:!0})},n.t=function(e,t){if(1&t&&(e=n(e)),8&t)return e;if(4&t&&"object"==typeof e&&e&&e.__esModule)return e;var a=Object.create(null);if(n.r(a),Object.defineProperty(a,"default",{enumerable:!0,value:e}),2&t&&"string"!=typeof e)for(var s in e)n.d(a,s,function(t){return e[t]}.bind(null,s));return a},n.n=function(e){var t=e&&e.__esModule?function(){return e.default}:function(){return e};return n.d(t,"a",t),t},n.o=function(e,t){return Object.prototype.hasOwnProperty.call(e,t)},n.p="",n(n.s=0)}([function(e,t,n){var a=n(1);!function(e){"use strict";e.MessageBot.registerExtension("DaPersonMGN/Mail",(function(e,t){function s(e){return e.replace(/&<>"'/g,(function(e){return{"&":"&amp;","<":"&lt;",">":"&gt;","'":"&apos;",'"':"&quot;"}[e]}))}if(window.ex2=e,e.System=new a,e.playerProgress={},e.save=function(){e.storage.set("mail",{id:e.System.mailID,mail:e.System.mail,banlist:e.System.banlist})},e.load=function(){var t=e.storage.get("mail",{id:0,mail:{},banlist:[]});e.System.mailID=t.id,e.System.mail=t.mail,e.System.banlist=t.banlist},e.uninstall=function(){e.storage.clear("mail"),e.remove()},e.remove=function(){t.onMessage.unsub(e.onMessage),t.onLeave.unsub(e.onLeave),t.removeCommand("mail"),e.bot.getExports("ui")&&e.bot.getExports("ui").removeTab(e.tab)},e.onMessage=function({player:t,message:n}){e.System.banlist.indexOf(t.name)>-1||n.startsWith("/")||e.playerProgress[t.name]&&(e.playerProgress[t.name].heading?(e.playerProgress[t.name].body=n,e.System.send(e.playerProgress[t.name].to,t.name,e.playerProgress[t.name].heading,e.playerProgress[t.name].body),delete e.playerProgress[t.name],e.bot.send("Letter sent!")):(e.playerProgress[t.name].heading=n,e.bot.send("Please specify now the contents of the letter.")))},e.onLeave=function(t){e.playerProgress[t.name]&&delete e.playerProgress[t.name]},t.addCommand("mail",(function(n,a){switch(a.length<1&&(a="CHECK"),a.split(" ")[0].toUpperCase()){case"HELP":if(e.System.banlist.indexOf(n.name)>-1)return;n.isAdmin?e.bot.send(["","/MAIL HELP - displays this message.","/MAIL SEND player_name - sends a letter to the recipient.","/MAIL CHECK - check how many letters you have.","/MAIL VIEW mail_id - view the letter associcated with your mail_id.","/MAIL CANCEL - stop sending a letter.","/MAIL BAN player_name (admin only) - bans a user from using the mail.","/MAIL UNBAN player_name (admin only) - unbans a user from the mail banlist.","/MAIL CHECK player_name (admin only) - checks the inbox of another player.","/MAIL CHECKSILENT player_name (admin only) - checks the inbox of another player, but don't send anything if they have no messages.","/MAIL VIEW mail_id (admin only) - views the letter associcated with any mail_id.","/MAIL REMOVE mail_id (admin only) - removes the letter associated with the mail_id.","/MAIL LIST (admin only) - list up to the previous 10 letters sent."].join("\n")):e.bot.send(["","/MAIL HELP - displays this message.","/MAIL SEND player_name - sends a letter to the recipient.","/MAIL CHECK - check how many letters you have.","/MAIL VIEW mail_id - view the letter associcated with your mail_id.","/MAIL CANCEL - stop sending a letter."].join("\n"));break;case"BAN":if(!n.isAdmin)return;var s=t.getPlayer(a.split(" ").slice(1).join(" "));e.System.banlist.indexOf(s.name)>-1?e.bot.send(s.name+" is already banned from using the mail."):(e.System.banlist.push(s.name),e.save(),e.bot.send(s.name+" has been added to the mail banlist."));break;case"UNBAN":if(!n.isAdmin)return;s=t.getPlayer(a.split(" ").slice(1).join(" ")),e.System.banlist.indexOf(s.name)>-1?(e.System.banlist.splice(e.System.banlist.indexOf(s.name),1),e.save(),e.bot.send(s.name+" has been removed from the mail banlist.")):e.bot.send(s.name+" was not on the mail banlist.");break;case"SEND":if(e.System.banlist.indexOf(n.name)>-1)return;if(e.playerProgress[n.name]&&delete e.playerProgress[n.name],!(s=t.getPlayer(a.split(" ").slice(1).join(" "))).hasJoined)return void e.bot.send(s.name+" has never joined this server.");e.playerProgress[n.name]={heading:null,body:null,to:s.name},e.bot.send("Please type the heading of the letter in chat. Type /MAIL CANCEL to stop sending your letter.");break;case"CHECK":if(e.System.banlist.indexOf(n.name)>-1)return;if(a.split(" ").slice(1).join(" ").length>0&&n.isAdmin){var i=[];for(var r in e.System.mail)e.System.mail[r].target!=t.getPlayer(a.split(" ").slice(1).join(" ")).name||e.System.mail[r].read||i.push(r+" - From: "+e.System.mail[r].sender);e.bot.send(t.getPlayer(a.split(" ").slice(1).join(" ")).name+" has "+i.length+" unread messages. \n"+i.join("\n"))}else{for(var r in i=[],e.System.mail)e.System.mail[r].target!==n.name||e.System.mail[r].read||i.push(r+" - From: "+e.System.mail[r].sender);e.bot.send("You have "+i.length+" unread messages. \n"+i.join("\n"))}break;case"CHECKSILENT":if(e.System.banlist.indexOf(n.name)>-1)return;if(a.split(" ").slice(1).join(" ").length>0&&n.isAdmin){for(var r in i=[],e.System.mail)e.System.mail[r].target!=t.getPlayer(a.split(" ").slice(1).join(" ")).name||e.System.mail[r].read||i.push(r+" - From: "+e.System.mail[r].sender);i.length>0&&e.bot.send(t.getPlayer(a.split(" ").slice(1).join(" ")).name+" has "+i.length+" unread messages. \n"+i.join("\n"))}else{for(var r in i=[],e.System.mail)e.System.mail[r].target!==n.name||e.System.mail[r].read||i.push(r+" - From: "+e.System.mail[r].sender);i.length>0&&e.bot.send("You have "+i.length+" unread messages. \n"+i.join("\n"))}break;case"VIEW":if(!e.System.mail[Number(a.split(" ")[1])])return void e.bot.send("You either didn't specify a mail_id, or the mail_id specified does not exist.");var l=e.System.mail[Number(a.split(" ")[1])];n.name===l.target?(e.bot.send(["Mail ID: "+l.id,"To: "+l.target,"From: "+l.sender,"Heading: "+l.header,"Body: "+l.body].join("\n")),l.read=!0,e.save()):n.isAdmin?(e.bot.send(["Mail ID: "+l.id,"To: "+l.target,"From: "+l.sender,"Heading: "+l.header,"Body: "+l.body].join("\n")),e.save()):e.bot.send("You can't view this letter.");break;case"REMOVE":if(!n.isAdmin)return;if(!e.System.mail[Number(a.split(" ")[1])])return void e.bot.send("You either didn't specify a mail_id, or the mail_id specified does not exist.");delete e.System.mail[Number(a.split(" ")[1])],e.save(),e.bot.send("Letter deleted.");break;case"LIST":if(!n.isAdmin)return;var o=Object.keys(e.System.mail).slice(-10);for(var r of(i=[],o))i.push(r+" - From: "+e.System.mail[r].sender);e.bot.send("Previous 10 letters sent:\n"+i.join("\n"));break;case"CANCEL":if(e.System.banlist.indexOf(n.name)>-1)return;e.playerProgress[n.name]?(delete e.playerProgress[n.name],e.save(),e.bot.send("Canceled your letter.")):e.bot.send("You aren't writing a letter.")}})),t.onMessage.sub(e.onMessage),t.onLeave.sub(e.onLeave),e.load(),e.bot.getExports("ui")){var i=e.bot.getExports("ui");e.tab=i.addTab("Mail"),e.tab.innerHTML=n(4),e.tab.addEventListener("change",(function(t){var a=t.target,i=e.world.getPlayer(a.value);for(var r in e.tab.querySelector(".letters").innerHTML="",e.System.mail)e.System.mail[r].target===i.name&&(e.tab.querySelector(".letters").innerHTML+=n(5).replace(/{SENDER}/gi,s(e.System.mail[r].sender)).replace(/{CONTENT}/gi,s(e.System.mail[r].body)).replace(/{HEADING}/gi,s(e.System.mail[r].header.toUpperCase())))}))}}))}(n(3))},function(e,t,n){var a=n(2);e.exports=function(){this.mail={},this.banlist=[],this.mailID=0,this.send=function(e,t,n,s){if(this.banlist.indexOf(t)>-1)throw new Error("Player is banned from sending mail.");this.mail[this.mailID]=new a(this.mailID,e,t,n,s),this.mailID++}}},function(e,t){e.exports=function(e,t,n,a,s){this.sender=n,this.target=t,this.header=a,this.body=s,this.read=!1}},function(e,t){e.exports=window["@bhmb/bot"]},function(e,t){e.exports='<link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/awesomplete/1.1.2/awesomplete.css"/>\n<script src="https://cdnjs.cloudflare.com/ajax/libs/awesomplete/1.1.2/awesomplete.js"><\/script>\n<div class="container" style="padding-top: 2%; height: 100%;">\n  <div class="box" style="height: 95%;">\n    <h4 class="title">Mail</h4>\n    <hr />\n    <label class="label">\n      Username\n      <input class="input" />\n    </label>\n    <hr />\n    <div class="letters">\n\n    </div>\n\n  </div>\n</div>\n'},function(e,t){e.exports='<div class="card">\n  <div class="card-header">\n    <p class="card-header-title">{HEADING} - FROM {SENDER}</p>\n  </div>\n  <div class="card-content">\n    {CONTENT}\n  </div>\n</div>\n'}]);