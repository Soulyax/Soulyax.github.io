$js_code = <<<JS
jQuery(document).ready(function($) {
    var abilities = wowDrQuizData.abilities;
    var categories = Object.keys(abilities);
    var flatAbilities = [];// Flatten abilities with category
categories.forEach(function(cat) {
    abilities[cat].forEach(function(abil) {
        flatAbilities.push({
            class: abil.class,
            ability: abil.ability,
            category: cat
        });
    });
});

function generateQuestion() {
    var index1 = Math.floor(Math.random() * flatAbilities.length);
    var index2 = Math.floor(Math.random() * flatAbilities.length);
    while (index2 === index1) {
        index2 = Math.floor(Math.random() * flatAbilities.length);
    }
    var abil1 = flatAbilities[index1];
    var abil2 = flatAbilities[index2];
    var question = 'Do "' + abil1.ability + '" (' + abil1.class + ') and "' + abil2.ability + '" (' + abil2.class + ') share DR?';
    $('#quiz-question').html('<p>' + question + '</p>');
    return {abil1: abil1, abil2: abil2};
}

var currentQuestion = generateQuestion();

$('#yes-btn').click(function() {
    checkAnswer(true, currentQuestion);
});

$('#no-btn').click(function() {
    checkAnswer(false, currentQuestion);
});

$('#next-btn').click(function() {
    $('#quiz-feedback').empty();
    $('#next-btn').hide();
    currentQuestion = generateQuestion();
});

function checkAnswer(userAnswer, question) {
    var sameCategory = question.abil1.category === question.abil2.category;
    var correct = (userAnswer === sameCategory);
    var feedback = correct ? 'Correct! ' : 'Incorrect. ';
    feedback += sameCategory ? 'They share DR because both are in the "' + question.abil1.category + '" category.' : 'They do not share DR. "' + question.abil1.ability + '" is in "' + question.abil1.category + '" and "' + question.abil2.ability + '" is in "' + question.abil2.category + '".';
    $('#quiz-feedback').html('<p>' + feedback + '</p>');
    $('#next-btn').show();
}});
JS;// Write the JS file on activation or something, but for simplicity, instruct to create quiz.js with this content.
add_action('admin_notices', function() {
    echo '<div class="notice notice-info"><p>Create a file named <strong>quiz.js</strong> in the plugin directory with the following content:</p><pre>' . esc_html($js_code) . '</pre></div>';
});
?>

