/**
 * Generate an unique identifier
 *
 * @returns {string}
 */
export function hash(id = '') {
    let separator = id ? `_${id}_` : '_';
    return new Date().getTime() + separator + s4() + s4();
}

export function numericHash() {
    return Math.floor(Math.random() * 9000000) + 1000000;
}

/**
 * Returns an array with items from arrayToBeFiltered that do not exist in array2, the criteria
 * that compares them is value
 *
 * @param arrayToBeFiltered
 * @param array2
 * @param value
 */
export function arrayDiff(arrayToBeFiltered, array2, value) {
    return arrayToBeFiltered.filter(function(obj) {
        return ! array2.some(function(obj2) {
            return obj[value] == obj2[value];
        });
    });
}

export function arrayDiffSimple(arrayToBeFiltered, array2) {
    return arrayToBeFiltered.filter(function(i) {
        return array2.indexOf(i) < 0;
    });
}

export function arrayToObject(array) {
    return array.reduce(function(acc, cur, i) {
        acc[i] = cur;
        return acc;
    }, {});
}

export function copyArray(array1, array2) {
    if (array2) {
        for (let i = 0; i < array2.length; i++) {
            array1.push(array2[i]);
        }
    }
}

export function copyArrayBeginning(array1, array2) {
    if (array2) {
        for (let i = 0; i < array2.length; i++) {
            array1.unshift(array2[i]);
        }
    }
}

export function getObjectByKey(array, key, value) {
    for (let i = 0; i < array.length; i++) {
        if (array[i][key] == value) {
            return array[i];
        }
    }

    return false;
}

export function getParameterByName(name, url) {
    if ( ! url)
        url = window.location.href;

    name = name.replace(/[\[\]]/g, "\\$&");

    let regex = new RegExp("[?&]" + name + "(=([^&#]*)|&|#|$)"),
        results = regex.exec(url);

    if (!results) return null;
    if (!results[2]) return '';

    return decodeURIComponent(results[2].replace(/\+/g, " "));
}

export function scrollToTop() {
    window.scrollTo(0, 0);
}

export function scrollToBottom() {
    let $app = document.getElementById('app');

    $app.scrollTo(0, $app.scrollHeight);
}

export function updateURLForPage(page) {
    window.history.replaceState({}, '', updateQueryStringParameter('page', page));
}

export function updateQueryStringParameter(key, value) {
    let uri = window.location.href;
    let re = new RegExp("([?&])" + key + "=.*?(&|$)", "i");
    let separator = uri.indexOf('?') !== -1 ? "&" : "?";

    if (uri.match(re)) {
        return uri.replace(re, '$1' + key + "=" + value + '$2');
    }

    return uri + separator + key + "=" + value;
}

export function browserIsFirefox() {
    return navigator.userAgent.indexOf('Firefox') !== -1;
}

export function getRandomNumberToBustCache() {
    return Math.floor((1 + Math.random()) * 0x10000);
}

export function deepClone(array) {
    return JSON.parse(JSON.stringify(array));
}

export function removeRecordByKey(recordsArray, itemKey) {
    recordsArray.forEach(function(record, index) {
        if (record.key === itemKey) {
            recordsArray.splice(index, 1);
        }
    });
}

/**
 * Add a property on an object if it doesn't already exist or it is null.
 *
 * @param object
 * @param property
 */
export function addObjectAttributeUnlessExisting(object, property) {
    if ( ! object.hasOwnProperty(property)) {
        object[property] = '';

        return;
    }

    if ( ! object[property]) {
        object[property] = '';
    }
}

/**
 * Returns an array of objects that are unique
 *
 * @param array
 * @param property
 * @returns {Array}
 */
export function eliminateDuplicateObjectsFromArray(array, property = 'name') {
    let object = {};
    let uniqueArray = [];

    for (let i = 0; i < array.length; i++) {
        object[array[i][property]] = array[i];
    }

    for (let key in object) {
        uniqueArray.push(object[key]);
    }

    return uniqueArray;
}

export function stripWhiteSpaces(string) {
    return string.replace(/[, .]+/g, '').trim();
}

export function exists(payload) {
    if (payload && Array.isArray(payload)) {
        return payload.length > 0;
    }

    if (payload && payload.constructor === Object) {
        return Object.keys(payload).length > 0;
    }

    return !! payload;
}

export function isNumber(value) {
    if (typeof(value) !== 'number' && typeof(value) !== 'string') {
        return false;
    }

    return Number.isInteger(parseInt(value));
}

export function areObjectsEqual (a, b) {
    if ( a === void 0 ) a = {};
    if ( b === void 0 ) b = {};

    // handle null value #1566
    if (!a || !b) { return a === b }
    var aKeys = Object.keys(a);
    var bKeys = Object.keys(b);
    if (aKeys.length !== bKeys.length) {
        return false
    }
    return aKeys.every(function (key) {
        var aVal = a[key];
        var bVal = b[key];
        // check nested equality
        if (typeof aVal === 'object' && typeof bVal === 'object') {
            return areObjectsEqual(aVal, bVal)
        }

        aVal = aVal !== null ? aVal : "";
        bVal = bVal !== null ? bVal : "";

        return String(aVal) === String(bVal)
    })
}

export function sortArrayOfObjectsByIntKey(array, objectKey) {
    return array.sort(function (object1, object2) {
        return compareInt(object1, object2, objectKey);
    });
}

export function sortedIndex(array, value) {
    let low = 0;
    let high = array.length;

    while (low < high) {
        let mid = (low + high) >>> 1;

        if (array[mid] < value) {
            low = mid + 1;
        } else {
            high = mid;
        }
    }

    return low;
}

// Internal
function s4() {
    return Math.floor((1 + Math.random()) * 0x10000)
        .toString(16)
        .substring(1);
}

function compareInt(object1, object2, objectKey) {
    if (parseInt(object1[objectKey]) < parseInt(object2[objectKey])) {
        return -1;
    }

    if (parseInt(object1[objectKey]) > parseInt(object2[objectKey])) {
        return 1;
    }

    return 0;
}
