An ATTO button for Simple Question filter
=========================================

Based on template from  Justin Hunt, the POODLL guy at  
https://github.com/justinhunt/moodle-atto_newtemplate

Creates a button that inserts a text link, question number and display mode into 
Moodle editable text  with delimiter tags which will be picked up by moodle_filter_simplequestion.

Using this button (not available to students), teachers can select a question from the
current course question bank to be inserted.

Tested and working with Moodle 3.3 and 3.4.

NOTE: The start and end tags for the question to be inserted and picked up by the filter simplequestion are hard-coded in the button.  I do not know how to access the config of simplequestion from this plugin.

Version
=======
1.5 still in beta testing, help welcome.

Configuration
=============
None.

Known bugs, Todos
=================
Documentation and screenshots to add to https://richardnz.net/simplequestion.html

Questions and suggestions
=========================
Richard Jones https://richardnz.net richardnz@outlook.com.
Karapiro Village
New Zealand
November 2017

Moodle
======
Tested in Moodle 3.3 and 3.4
Tested on Chrome, Firefox and Edge browsers
Debian Stretch, Apache2, PHP 7.1, Postgres 9.2.