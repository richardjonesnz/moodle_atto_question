Template for new Atto plugins for Moodle
========================================

From Justin Hunt, the POODLL guy at  https://github.com/justinhunt/moodle-atto_newtemplate

The idea is to develop an atto button that inserts a hashed question id into the text with 
delimiter tags which will be picked up by moodle_filter_question.

Using this button (not available to students), teachers can select a question from the
current course question bank to be inserted.

The hashed id will be picked up by the filter.

That's the general idea anyway.