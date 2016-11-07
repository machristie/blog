
/*
 * Required field validation
 * - set a custom validation message
 * - toggle css class to show error state (for example, Bootstrap has-error)
 * - see also: https://developer.mozilla.org/en-US/docs/Web/Guide/HTML/HTML5/Constraint_validation
 */

// <form>
//     <input type="text" name="fullname" required/>
//     <button type="submit">Add</button>
// </form>    
$('input[name=fullname]').on('invalid', function(event){
    this.setCustomValidity("Please provide a your full name");
    $('.some-form-group').addClass('has-error');
});
$('input[name=fullname]').on('keyup input change', function(event){
    if (this.checkValidity) { // feature detect
        // Reset custom error message. If it isn't empty string it is considered invalid.
        this.setCustomValidity("");
        // checkValidity will cause invalid event to be dispatched. See invalid
        // event handler above which will set the custom error message.
        var valid = this.checkValidity();
        $('.some-form-group').toggleClass('has-error', !valid);
    }
});

/*
 * Form novalidate
 * - for when you want to handle the display of errors and you don't want
 *   the form to be prevented from being submitted when not valid
 */
// No example code yet
