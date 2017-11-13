// This file is part of Moodle - http://moodle.org/
//
// Moodle is free software: you can redistribute it and/or modify
// it under the terms of the GNU General Public License as published by
// the Free Software Foundation, either version 3 of the License, or
// (at your option) any later version.
//
// Moodle is distributed in the hope that it will be useful,
// but WITHOUT ANY WARRANTY; without even the implied warranty of
// MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
// GNU General Public License for more details.
//
// You should have received a copy of the GNU General Public License
// along with Moodle.  If not, see <http://www.gnu.org/licenses/>.

/*
 * @package    atto_question
 * @copyright  COPYRIGHTINFO
 * @license    http://www.gnu.org/copyleft/gpl.html GNU GPL v3 or later
 */

/**
 * @module moodle-atto_question-button
 */

/**
 * Atto text editor question plugin.
 *
 * @namespace M.atto_question
 * @class button
 * @extends M.editor_atto.EditorPlugin
 */

var COMPONENTNAME = 'atto_question';
var TEXTLINKCONTROL = 'question_link';
var QUESTIONIDCONTROL = 'question_number';
var DISPLAYMODECONTROL = 'display_mode';
var LOGNAME = 'atto_question';

var CSS = {
        INPUTSUBMIT: 'atto_media_urlentrysubmit',
        INPUTCANCEL: 'atto_media_urlentrycancel',
        TEXTLINKCONTROL: 'textlinkcontrol',
        QUESTIONIDCONTROL: 'questionidcontrol',
        DISPLAYMODECONTROL: 'displaymodecontrol'
    },
    SELECTORS = {
        TEXTLINKCONTROL: '.textlinkcontrol',
        QUESTIONIDCONTROL: '.questionidcontrol',
        DISPLAYMODECONTROL: '.displaymodecontrol'
    };

var TEMPLATE = '' +
    '<form class="atto_form">' +
        '<div id="{{elementid}}_{{innerform}}" class="mdl-align">' +
            '<label for="{{elementid}}_{{TEXTLINKCONTROL}}">' +
            '{{get_string "enterlinktext" component}}</label>' +
            '<input class="{{CSS.TEXTLINKCONTROL}}" id="{{elementid}}_{{TEXTLINKCONTROL}}"' +
            ' name="{{elementid}}_{{TEXTLINKCONTROL}}" value="{{defaulttextlink}}" />' +
            '<label for="{{elementid}}_{{QUESTIONIDCONTROL}}">' +
            '{{get_string "enterquestionid" component}}</label>' +
            '<input class="{{CSS.QUESTIONIDCONTROL}}" id="{{elementid}}_{{QUESTIONIDCONTROL}}"' +
            ' name="{{elementid}}_{{QUESTIONIDCONTROL}}" value="{{defaultquestionid}}" />' +
            '<label for="{{elementid}}_{{DISPLAYMODECONTROL}}">' +
            '{{get_string "enterdisplaymode" component}}</label>' +
            '<input class="{{CSS.DISPLAYMODECONTROL}}" id="{{elementid}}_{{DISPLAYMODECONTROL}}"' +
            ' name="{{elementid}}_{{DISPLAYMODECONTROL}}" value="{{defaultdisplaymode}}" />' + 
            '<br /><br />' +
            '<button class="{{CSS.INPUTSUBMIT}}">{{get_string "insert" component}}</button>' +
        '</div>' +
        //'icon: {{clickedicon}}' +
    '</form>';

Y.namespace('M.atto_question').Button = Y.Base.create('button', Y.M.editor_atto.EditorPlugin, [], {

  
    /**
     * Initialize the button
     *
     * @method Initializer
     */
    initializer: function() {
        // If we don't have the capability to view then give up.
        if (this.get('disabled')){
            return;
        }

        var twoicons = ['iconone'];
        // We are only going to need the one button
        // I know I should really simplify this

        Y.Array.each(twoicons, function(theicon) {
        // Add the question icon/button
        this.addButton({
           icon: 'ed/' + twoicons,
           iconComponent: 'atto_question',
           buttonName: theicon,
           callback: this._displayDialogue,
           callbackArgs: theicon
         });
        }, this);
    },

    /**
     * Get the id of the text link control where we store the link text for the question
     *
     * @method _getTextLinkControlName
     * @return {String} the txt for the text link form field
     * @private
     */
    _getTextLinkControlName: function(){
        return(this.get('host').get('elementid') + '_' + TEXTLINKCONTROL);
    },

     /**
     * Display the question Dialogue
     *
     * @method _displayDialogue
     * @private
     */
    _displayDialogue: function(e, clickedicon) {
        e.preventDefault();
        var width=400;


        var dialogue = this.getDialogue({
            headerContent: M.util.get_string('dialogtitle', COMPONENTNAME),
            width: width + 'px',
            focusAfterHide: clickedicon
        });
        //dialog doesn't detect changes in width without this
        //if you reuse the dialog, this seems necessary
        if(dialogue.width !== width + 'px'){
            dialogue.set('width',width+'px');
        }

        //append buttons to iframe
        var buttonform = this._getFormContent(clickedicon);

        var bodycontent =  Y.Node.create('<div></div>');
        bodycontent.append(buttonform);

        //set to bodycontent
        dialogue.set('bodyContent', bodycontent);
        dialogue.show();
        this.markUpdated();
    },


     /**
     * Return the dialogue content for the tool, attaching any required
     * events.
     *
     * @method _getDialogueContent
     * @return {Node} The content to place in the dialogue.
     * @private
     */
    _getFormContent: function(clickedicon) {
        var template = Y.Handlebars.compile(TEMPLATE),
            content = Y.Node.create(template({
                elementid: this.get('host').get('elementid'),
                CSS: CSS,
                TEXTLINKCONTROL: TEXTLINKCONTROL,
                component: COMPONENTNAME,
                defaultflavor: this.get('defaulttextlink'),
                QUESTIONIDCONTROL: QUESTIONIDCONTROL,
                component: COMPONENTNAME,
                defaultflavor: this.get('defaultquestionid')
                //clickedicon: clickedicon
            }));

        this._form = content;
        this._form.one('.' + CSS.INPUTSUBMIT).on('click', this._doInsert, this);
        return content;
    },

    /**
     * Inserts the users input onto the page
     * @method _getDialogueContent
     * @private
     */
    _doInsert : function(e){
        e.preventDefault();
        this.getDialogue({
            focusAfterHide: null
        }).hide();

        // deal with the link text
        var linkcontrol = this._form.one(SELECTORS.TEXTLINKCONTROL);
        var linkvalue = linkcontrol.get('value');

        // Check is there
        if (!linkvalue) {
            Y.log('No link text could be found.', 'warn', LOGNAME);
            return;
        }

        // get the question number
        var idcontrol = this._form.one(SELECTORS.QUESTIONIDCONTROL);
        var idvalue = idcontrol.get('value');

        // Check is there
        if (!idvalue) {
            Y.log('No question id could be found.', 'warn', LOGNAME);
            return;
        }


        //  Check is an integer - use this for the question ID
        var isnum = /^\d+$/.test(idvalue);
        if (!isnum) {
            Y.log('Requires an integer value', 'warn', LOGNAME);
            return;
        }
         
        // build content here: {QUESTION} tags and text
        
        var content = '{QUESTION:' + linkvalue + '|' + idvalue + '}';

        this.editor.focus();
        this.get('host').insertContentAtFocusPoint(content);
        this.markUpdated();

    }
}, { ATTRS: {
        disabled: {
            value: false
        },

        usercontextid: {
            value: null
        },

        defaultlinktext: {
        value: ''
        }
    }
});
