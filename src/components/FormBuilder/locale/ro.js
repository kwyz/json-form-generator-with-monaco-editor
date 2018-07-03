'use strict';
// This file have an single function that contain a bunch of keywords and error messages for romanian language
module.exports = function localize_ro(errors) {
    if (!(errors && errors.length)) return;
    for (var i = 0; i < errors.length; i++) {
        var e = errors[i];
        var out;
        switch (e.keyword) {
            case '$ref':
                out = 'Nu pot rezolva referința ' + (e.params.ref);
                break;
            case 'additionalItems':
                out = '';
                var n = e.params.limit;
                out += 'Numărul maxim de itemi nu poate depăși ' + (n)+" element";
                if (n != 1) {
                    out += 'e';
                }
                break;
            case 'additionalProperties':
                out = 'Proprietățile adiționale sunt interzise';
                break;
            case 'anyOf':
                out = 'should match some schema in "anyOf"';
                break;
            case 'const':
                out = 'Trebuie să fie egală cu constanta';
                break;
            case 'contains':
                out = 'Trebuie să conțină itemi valizi';
                break;
            case 'custom':
                out = 'Trebuie să treacă validarea cuvântului cheie ' +(e.keyword);

                break;
            case 'dependencies':
                out = '';
                var n = e.params.depsCount;
                out += 'Trebuie să aibă ';
                if (n == 1) {
                    out += 'proprietatea';
                } else {
                    out += 'proprietăți';
                }
                out += ' ' + (e.params.deps) + ' când există proprietatea ' + (e.params.property) ;
                break;
            case 'enum':
                out = 'Trebuie să fie egală cu una din proprietățile predifinite';
                break;
            case 'exclusiveMaximum':
                out = '';
                var cond = e.params.comparison + " " + e.params.limit;
                out += 'Trebuie sa fie ' + (cond);
                break;
            case 'exclusiveMinimum':
                out = '';
                var cond = e.params.comparison + " " + e.params.limit;
                out += 'Trebuie sa fie ' + (cond);
                break;
            case 'false schema':
                out = 'Schema este falsă';
                break;
            case 'format':
                out = 'Trebuie sa fie de tip "' + (e.params.format) + '"';
                break;
            case 'formatExclusiveMaximum':
                out = 'formatExclusiveMaximum trebuie să fie de tip boolean';
                break;
            case 'formatExclusiveMinimum':
                out = 'formatExclusiveMinimum trebuie să fie de tip boolean';
                break;
            case 'formatMaximum':
                out = '';
                var cond = e.params.comparison + " " + e.params.limit;
                out += 'Trebuie să fie ' + (cond);
                break;
            case 'formatMinimum':
                out = '';
                var cond = e.params.comparison + " " + e.params.limit;
                out += 'Trebuie să fie ' + (cond);
                break;
            case 'if':
                out = 'Trebuie să se potrivească "' + (e.params.failingKeyword);
                break;
            case 'maximum':
                out = '';
                var cond = e.params.comparison + " " + e.params.limit;
                out += 'Trebuie să fie ' + (cond);
                break;
            case 'maxItems':
                out = '';
                var n = e.params.limit;
                out += 'Nu poate conține mai mult de ' + (n) + ' itemi';
                if (n != 1) {
                    out += 's';
                }
                break;
            case 'maxLength':
                out = '';
                var n = e.params.limit;
                out += 'Textul nu poate depăși ' + (n) + ' caractere';
                if (n != 1) {
                    out += 's';
                }
                break;
            case 'maxProperties':
                out = '';
                var n = e.params.limit;
                out += 'Nu poate depăși numărul de ' + (n) ;
                if (n == 1) {
                    out += 'proprietate';
                } else {
                    out += 'proprietăți';
                }
                break;
            case 'minimum':
                out = '';
                var cond = e.params.comparison + " " + e.params.limit;
                out += 'Nu poate conține mai mic de ' + (cond);
                break;
            case 'minItems':
                out = '';
                var n = e.params.limit;
                out += 'Nu poate conține mai puțin de ' + (n) + ' itemi';
                if (n != 1) {
                    out += 's';
                }
                break;
            case 'minLength':
                out = '';
                var n = e.params.limit;
                out += 'Trebuie sa fie minim de ' + (n) + ' caractere';
                if (n != 1) {
                    out += 's';
                }
                break;
            case 'minProperties':
                out = '';
                var n = e.params.limit;
                out += 'Nu poate conține mai puțin de ' + (n);
                if (n == 1) {
                    out += 'proprietate';
                } else {
                    out += 'proprietăți';
                }
                break;
            case 'multipleOf':
                out = 'Trebuie să fie un multiplu de ' + (e.params.multipleOf);
                break;
            case 'not':
                out = 'Nu necesită să fie fie valid, conform nodului „not” din schemă';
                break;
            case 'oneOf':
                out = 'Trebui să se potrivească exact cu o schemă în nodul "oneOf"';
                break;
            case 'pattern':
                out = 'Trebuie să corespundă expresiei regulate "' + (e.params.pattern) + '"';
                break;
            case 'patternRequired':
                out = 'Trebui să aibă proprietăți potrivite modelului "' + (e.params.missingPattern) + '"';
                break;
            case 'propertyNames':
                out = 'Numele proprietății \'' + (e.params.propertyName) + '\' este gresit';
                break;
            case 'required':
                out = 'Trebuie să conțină proprietatea obligatorie ' + (e.params.missingProperty);
                break;
            case 'switch':
                out = 'Trebuie să treacă validarea cuvântului „keyword”, cazul' + (e.params.caseIndex) + ' eșuează';
                break;
            case 'type':
                out = 'Trebuie să fie de tip ' + (e.params.type);
                break;
            case 'uniqueItems':
                out = 'Nu trebuie să conțină itemi duplicați (itemii ## ' + (e.params.j) + ' și ' + (e.params.i) + ' sunt idetici)';
                break;
            default:
                continue;
        }
        e.message = out;
    }
};

