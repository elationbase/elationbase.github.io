/* jQuery typewriter plugin
    2012-11-15
    https://github.com/bergus */
(function($,name){$[name+"Defaults"]={framerate:1000/60,group:/.{0,2}/g};$.fn[name]=function(options,callback){if(typeof options!='object')callback=options,options={};return this.each(function(){var el=$(this),conf=$.extend({},$[name+"Defaults"],options);el.queue("fx",function(next){animateNode(this,conf,typeof callback=='function'?function(){callback.call(el[0]);next();}:next);el.show();});});};function chunk(text,conf){return text.match(conf.group);}
function timeout(callback,conf){setTimeout(callback,conf.framerate);}
function animateNode(element,conf,callback){var pieces=[];if(element.nodeType==1&&element.hasChildNodes()){while(element.hasChildNodes())
pieces.push(element.removeChild(element.firstChild));timeout(function childStep(){if(pieces.length){var piece=pieces.shift();animateNode(piece,conf,childStep);element.appendChild(piece);}else
callback();},conf);}else if(element.nodeType==3){pieces=chunk(element.data,conf);element.data="";(function addText(){element.data+=pieces.shift();timeout(pieces.length?addText:callback,conf);})();}else
timeout(callback,conf);}})(jQuery,"typewriter");