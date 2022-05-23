const language = $('#language_id');
const topic = $('#topic_id');
const learn = $('#learn_id');
const submit = $('#submit_btn');
const iframe = $('#iframe_id');
const iframe_container = $('#iframe_container');


const data = 
    {
        "JavaScript": {
            "JS Array": {
                "concat()": "https://www.w3schools.com/jsref/jsref_concat_array.asp",
                "constructor": "https://www.w3schools.com/jsref/jsref_constructor_array.asp",
                "copyWithin()": "https://www.w3schools.com/jsref/jsref_copywithin.asp",
                "entries()": "https://www.w3schools.com/jsref/jsref_entries.asp"
            },
            "JS Boolean": {
                "prototype": "https://www.w3schools.com/jsref/jsref_prototype_boolean.asp",
                "toString()": "https://www.w3schools.com/jsref/jsref_tostring_boolean.asp",
                "valueOf()": "https://www.w3schools.com/jsref/jsref_valueof_boolean.asp"
            },
            "JS Date": {
                "constructor": "https://www.w3schools.com/jsref/jsref_constructor_date.asp",
                "getDate()": "https://www.w3schools.com/jsref/jsref_getdate.asp",
                "getDay()": "https://www.w3schools.com/jsref/jsref_getday.asp",
                "getFullYear()": "https://www.w3schools.com/jsref/jsref_getfullyear.asp"
            },
            "JS Number": {
                "constructor": "https://www.w3schools.com/jsref/jsref_constructor_number.asp",
                "isFinite()": "https://www.w3schools.com/jsref/jsref_isfinite_number.asp",
                "isInteger()": "https://www.w3schools.com/jsref/jsref_isinteger.asp",
                "isNaN()": "https://www.w3schools.com/jsref/jsref_isnan_number.asp"
            },
            "JS String": {
                "toString()": "https://www.w3schools.com/jsref/jsref_tostring_string.asp",
                "toUpperCase()": "https://www.w3schools.com/jsref/jsref_touppercase.asp",
                "trim()": "https://www.w3schools.com/jsref/jsref_trim_string.asp",
                "valueOf()": "https://www.w3schools.com/jsref/jsref_valueof_string.asp"
            }
        },
        "Structured Query Language": {
            "SQL Database": {
                "SQL Create DB": "https://www.w3schools.com/sql/sql_create_db.asp",
                "SQL Drop DB": "https://www.w3schools.com/sql/sql_drop_db.asp",
                "SQL Backup DB": "https://www.w3schools.com/sql/sql_backup_db.asp",
                "SQL Create Table": "https://www.w3schools.com/sql/sql_create_table.asp"
            },
            "SQL Keywords": {
                "ADD": "https://www.w3schools.com/sql/sql_ref_add.asp",
                "ADD CONSTRAINT": "https://www.w3schools.com/sql/sql_ref_add_constraint.asp",
                "ALL": "https://www.w3schools.com/sql/sql_ref_all.asp",
                "ALTER": "https://www.w3schools.com/sql/sql_ref_alter.asp"
            },
            "SQL String Functions": {
                "ASCII": "https://www.w3schools.com/sql/func_sqlserver_ascii.asp",
                "CHAR": "https://www.w3schools.com/sql/func_sqlserver_char.asp",
                "CHARINDEX": "https://www.w3schools.com/sql/func_sqlserver_charindex.asp",
                "CONCAT": "https://www.w3schools.com/sql/func_sqlserver_concat.asp"
            },
            "SQL Numeric Functions": {
                "SQRT": "https://www.w3schools.com/sql/func_sqlserver_sqrt.asp",
                "SQUARE": "https://www.w3schools.com/sql/func_sqlserver_square.asp",
                "SUM": "https://www.w3schools.com/sql/func_sqlserver_sum.asp",
                "TAN": "https://www.w3schools.com/sql/func_sqlserver_tan.asp"
            },
            "SQL Date Functions": {
                "CURRENT_TIMESTAMP": "https://www.w3schools.com/sql/func_sqlserver_current_timestamp.asp",
                "DATEADD": "https://www.w3schools.com/sql/func_sqlserver_dateadd.asp",
                "DATEDIFF": "https://www.w3schools.com/sql/func_sqlserver_datediff.asp",
                "DATEFROMPARTS": "https://www.w3schools.com/sql/func_sqlserver_datefromparts.asp",
                "DATENAME": "https://www.w3schools.com/sql/func_sqlserver_datename.asp"
            },
            "SQL Advanced Functions": {
                "SESSION_USER": "https://www.w3schools.com/sql/func_sqlserver_session_user.asp",
                "SESSIONPROPERTY": "https://www.w3schools.com/sql/func_sqlserver_sessionproperty.asp",
                "SYSTEM_USER": "https://www.w3schools.com/sql/func_sqlserver_system_user.asp",
                "USER_NAME": "https://www.w3schools.com/sql/func_sqlserver_user_name.asp"
            }
        }
    }



function initializeSelect2(elem, name) {
    elem.select2({
        placeholder: 'Select ' + name,
        allowClear: true,
    });
}

function clearSelect2(elem) {
    elem.empty().trigger('change');    
}

function resetIframe() {
    iframe.prop('src', '');
    iframe.prop('title', '');
    iframe_container.addClass('d-none');
}

function makeOptions(array) {
    let options = [{
        "id": "",
        "text": ""
    }]

    for (let item of array) {
        options.push({
            "id": item,
            "text": item
        })
    }
    return options
}


window.onload = event => {

    initializeSelect2(language, 'language');
    initializeSelect2(topic, 'topic');
    initializeSelect2(learn, 'learn');
    resetIframe();

    language.select2({
        allowClear: true,
        data: makeOptions(Object.keys(data)),
        placeholder: 'Select language',
    });
};



language.change(() => {

    clearSelect2(topic);
    clearSelect2(learn);
    resetIframe();

    if (language.val()) {
        topic.select2({
            allowClear: true,
            data: makeOptions(Object.keys(data[language.val()])),
            placeholder: 'Select topic',
        });
    }
})


topic.change(() => {
    clearSelect2(learn)
    resetIframe();

    if (topic.val()) {
        learn.select2({
            allowClear: true,
            data: makeOptions(Object.keys(data[language.val()][topic.val()])),
            placeholder: 'Select item',
        });
    }
})

learn.change(() => {
    resetIframe();
})

submit.click(() => {
    if (language.val() && topic.val() && learn.val()) {
        iframe.prop('src', data[language.val()][topic.val()][learn.val()]);
        iframe.prop('title', learn.val());
        iframe_container.removeClass('d-none');
    } else {
        resetIframe();
    }
})