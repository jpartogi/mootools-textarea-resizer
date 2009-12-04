/*
description: Mootools TextareaResizer plugin for Mootools 1.2.x

license: MIT-style license.

copyright: Copyright (c) 2009 [Joshua Partogi](http://scrum8.com/).

authors: Joshua Partogi (http://scrum8.com/)

*/
var TextareaResizer = new Class({

    initialize: function(element){
        this.textarea = element;
        this.element = element;
    },

    resizable: function(){

        var staticOffset = 0;
        var iLastMousePos = 0;
        var iMin = 32;

        var textarea = this.element;
        var div = new Element('div').addClass('resizable-textarea');
        
        div.wraps(textarea);
        div.setStyle('width', textarea.getStyle('width').toInt());

        var grippie = new Element('div').addClass('grippie');
        grippie.inject(div, 'bottom');

        var endDrag = function(e) {            
            document.removeEvent('mousemove', performDrag);
            document.removeEvent('mouseup', endDrag);
            
            textarea.setStyle('opacity', 1.0);
            textarea.focus();

            staticOffset = 0;
            iLastMousePos = 0;
        }

        var performDrag = function(e) {
            var iThisMousePos = mousePosition(e).y;
            var iMousePos = staticOffset + iThisMousePos;

            if (iLastMousePos >= (iThisMousePos)) {
                iMousePos -= 5;
            }

            iLastMousePos = iThisMousePos;
            iMousePos = Math.max(iMin, iMousePos);

            textarea.setStyle('height', iMousePos);

            if (iMousePos < iMin) {
                endDrag(e);
            }
        }

        var startDrag = function(e){
            textarea.blur();

            iLastMousePos = mousePosition(e).y;
            staticOffset = textarea.getSize().y - iLastMousePos;
            textarea.setStyle('opacity', 0.25);
            
            document.addEvent('mousemove', performDrag);
            document.addEvent('mouseup', endDrag);
        }

        var mousePosition = function(e) {
            return {
                x: e.event.clientX + document.documentElement.scrollLeft,
                y: e.event.clientY + document.documentElement.scrollTop
            };
        }

        grippie.addEvent('mousedown', startDrag);
    }
    

});


(function(){

    Element.implement({

        resizable: function(){
            var resizer = new TextareaResizer(this);

            resizer.resizable();
        }
        
    });

})();