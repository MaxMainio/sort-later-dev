console.log('https://www.youtube.com/watch?v=NuAKnbIr6TE');

const favicon = document.querySelector("link[rel~='icon']");

const folderCover = document.getElementById('folder-background');
const studentsSlide = document.getElementById('students');
const workSlide = document.getElementById('work');

const falseFile = document.getElementById('false-file');

const submissionSection = document.getElementById('submission-section');

const printGradient = document.getElementById('print-gradient');
const printDots = document.getElementById('print-dots')
const printIMG = document.getElementById('work-img');
const workTitle = document.getElementById('work-title');
const studentName = document.getElementById('student-name');

const allBtn = document.getElementById('all-check');
const filterBtn = document.querySelectorAll('.filter-checks');










// ON LOAD ---------------------------------------------------------------------------------------------------------------
window.onload = (event) => {
    // DIGITAL
    favicon.href = 'assets/favicons/favicon-' + randomIntFromInterval(1, 10) + '.ico';
    falseFile.style.setProperty("background-image", getRandomWebDots());
    workSlide.style.background = generateWebGradient();
    setStudentWork();

    // PRINT
    printPrep();
}









// PRINTING    -----------------------------------------------------------------------------------------------------------
window.addEventListener('afterprint', (event) => {
    printPrep();
});



function generateSelectedPoster(clickedButton){
    var imgPath = clickedButton.dataset.img;

    printIMG.src = imgPath;
    workTitle.innerHTML = clickedButton.dataset.title.toString();
    studentName.innerHTML = clickedButton.dataset.name.toString();

    printDots.src = getRandomPrintDots();
    printGradient.style.background = generatePrintGradient();


    setTimeout(window.print(), 500);
}



// GENERATE STUDENT WORK
function printPrep() {
    fetch('https://maxmainio.github.io/sort-later-dev/library/json/data.json')
    .then((response) => response.json())
    .then((json) => {
        // SELECT WORK TO SHOWCASE
        var selectedWork = json[randomIntFromInterval(0, json.length - 1)];

        // GENERATE IMAGE PATH
        var imgNumber = generateImgNum(selectedWork.fileNumber);
        var imgPath = 'https://maxmainio.github.io/sort-later-dev/library/student-work/' + selectedWork.filePath + imgNumber + selectedWork.fileExtension;

        // PLACE SELECTED MATERIAL
        printIMG.src = imgPath;
        workTitle.innerHTML = selectedWork.workTitle.toString();
        studentName.innerHTML = selectedWork.prefferedName.toString();

        printDots.src = getRandomPrintDots();
        printGradient.style.background = generatePrintGradient();
    });
}



// IF THERE'S MORE THAN ONE WORK, SELECT AT RANDOM
function generateImgNum(num){
    if (num != 1) {
        var imgNumber = randomIntFromInterval(1, num);
        return '-' + imgNumber.toString();
    } else {
        return '';
    }
}



















// FOLDER INTERACTIVITY    -----------------------------------------------------------------------------------------------
// CLICK ON STUDENTS / CREDITS PAGE
studentsSlide.addEventListener('click', e => {
    folderCover.classList.add('animatable');
    studentsSlide.classList.add('animatable');
    workSlide.classList.add('animatable');

    folderCover.classList.remove('removed');
    studentsSlide.classList.remove('removed');
    workSlide.classList.remove('removed');

    setTimeout(() => {
        folderCover.classList.remove('animatable');
        studentsSlide.classList.remove('animatable')
        workSlide.classList.remove('animatable')
    },500);
})

// CLICK ON WORK PAGE
workSlide.addEventListener('click', e => {
    folderCover.classList.add('animatable');
    studentsSlide.classList.add('animatable');
    workSlide.classList.add('animatable');

    folderCover.classList.add('removed');
    studentsSlide.classList.add('removed');
    workSlide.classList.remove('removed');

    setTimeout(() => {
        folderCover.classList.remove('animatable');
        studentsSlide.classList.remove('animatable');
        workSlide.classList.remove('animatable');
    },500);
})



















// GENERATE DOTS    ------------------------------------------------------------------------------------------------------
function getRandomWebDots() {
    var dotNum = randomIntFromInterval(1, 3);
    var dotPath = 'url(assets/web-svg/dots-web-' + dotNum.toString() + '.svg';
    return dotPath
}

function getRandomPrintDots() {
    var dotNum = randomIntFromInterval(1, 3);
    var dotPath = 'assets/print-svg/dots-print-' + dotNum.toString() + '.svg';
    return dotPath
}



// GRADIENTS    ----------------------------------------------------------------------------------------------------------
// GENERATE WEB GRADIENT
function generateWebGradient(){
    var gradTag = 'gradient' + randomIntFromInterval(0, 4);
    var gradColors = eval(gradTag);
    var gradSteps = gradColors.length;

    var gradPlacements = [];
    var min = 0;
    var max = 100;
    var offset = 0;

    for (var i = 0; i < gradSteps; i ++) {
        var wiggleRoom = 10 * (gradSteps - i);

        min = 0 + offset;
        max = 100;
        max = max - wiggleRoom;

        placement = randomIntFromInterval(min, max);
        gradPlacements[i] = placement
        offset = placement + 10;
    }

    var lause = 'linear-gradient(180deg';

    for (var i=0; i < gradSteps; i++) {
        var appendable = gradColors[i] + ' ' + gradPlacements[i] + '%'
        lause = lause + ', ' + appendable
    }

    return(lause + ')');
}



// GENERATE PRINT GRADIENT
function generatePrintGradient(){
    var gradTag = 'gradient' + randomIntFromInterval(0, 4);
    var gradColors = eval(gradTag);
    var gradSteps = gradColors.length;

    var gradPlacements = [];
    var min = 0;
    var max = 100;
    var offset = 0;

    for (var i = 0; i < gradSteps; i ++) {
        var wiggleRoom = 10 * (gradSteps - i);

        min = 0 + offset;
        max = 100;
        max = max - wiggleRoom;

        placement = randomIntFromInterval(min, max);
        gradPlacements[i] = placement
        offset = placement + 10;
    }

    var lause = 'linear-gradient(' + flipACoin();

    function flipACoin(){
        var coinFlip = Math.round(Math.random());
        if (coinFlip == 1) {
            return '0deg';
        } else {
            return '180deg';
        }
    }

    for (var i=0; i < gradSteps; i++) {
        var appendable = gradColors[i] + ' ' + gradPlacements[i] + '%'
        lause = lause + ', ' + appendable
    }

    return(lause + ')');
}









// GENERATE STUDENT WORK SECTION    --------------------------------------------------------------------------------------
// GET STUDENTS WORK
function setStudentWork(){
    fetch('https://maxmainio.github.io/sort-later-dev/library/json/data.json')
    .then((response) => response.json())
    .then((json) => {
        for (let i = 0; i < json.length; i ++) {
            if (json[i].fileNumber != 1) {
                generateMultiple(json[i]);
            } else {
                generateSingular(json[i]);
            }
        }
    });
}



// IF SINGULAR
function generateSingular(singleSubmission) {
    var submissionFilePath = generateFilePath(singleSubmission.filePath, singleSubmission.fileExtension);

    if (singleSubmission.workDescription != 'Null') {
        var submissionTitleCard = generateTitleCardWith(singleSubmission.prefferedName, singleSubmission.workTitle, singleSubmission.workDescription);

        var submissionAltText = generateAltTextWith(singleSubmission.prefferedName, singleSubmission.workTitle, singleSubmission.workType, singleSubmission.yearCreated, singleSubmission.workDescription);

        var submissionTitleText = generateTitleTextWith(singleSubmission.prefferedName, singleSubmission.workTitle, singleSubmission.workType, singleSubmission.yearCreated, singleSubmission.workDescription);
    } else {
        var submissionTitleCard = generateTitleCardWithOut(singleSubmission.prefferedName, singleSubmission.workTitle);

        var submissionAltText = generateAltTextWithOut(singleSubmission.prefferedName, singleSubmission.workTitle, singleSubmission.workType, singleSubmission.yearCreated);

        var submissionTitleText = generateTitleTextWithOut(singleSubmission.prefferedName, singleSubmission.workTitle, singleSubmission.workType, singleSubmission.yearCreated);
    }

    var submissionElement = document.createElement('div');
    submissionElement.setAttribute('class', 'submission ' + singleSubmission.workType);

    submissionElement.innerHTML = '<a href="' + singleSubmission.websiteLink + '" target="_blank"><img src="' + submissionFilePath + '" alt="' + submissionAltText + '" title="' + submissionTitleText + '" loading="lazy"></a>' + submissionTitleCard + '<button data-img="' + submissionFilePath + '" data-name="' + singleSubmission.prefferedName + '" data-title="' + singleSubmission.workTitle + '">Print a Poster</button>'

    submissionSection.appendChild(submissionElement);
}



// IF MULTIPLE
function generateMultiple(multiSubmission) {
    var multiAmount = multiSubmission.fileNumber;
    var dataAttribute = generateDataAttribute(multiSubmission.prefferedName, multiSubmission.workTitle);
    var firstFilePath = generateFirstFilePath(multiSubmission.filePath, multiSubmission.fileExtension);

    if (multiSubmission.workDescription != 'Null') {
        var submissionTitleCard = generateMultiTitleCardWith(multiSubmission.prefferedName, multiSubmission.workTitle, multiSubmission.workDescription);

        var submissionAltText = generateAltTextWith(multiSubmission.prefferedName, multiSubmission.workTitle, multiSubmission.workType, multiSubmission.yearCreated, multiSubmission.workDescription);

        var submissionTitleText = generateTitleTextWith(multiSubmission.prefferedName, multiSubmission.workTitle, multiSubmission.workType, multiSubmission.yearCreated, multiSubmission.workDescription);
    } else {
        var submissionTitleCard = generateMultiTitleCardWithOut(multiSubmission.prefferedName, multiSubmission.workTitle);

        var submissionAltText = generateAltTextWithOut(multiSubmission.prefferedName, multiSubmission.workTitle, multiSubmission.workType, multiSubmission.yearCreated);

        var submissionTitleText = generateTitleTextWithOut(multiSubmission.prefferedName, multiSubmission.workTitle, multiSubmission.workType, multiSubmission.yearCreated);
    }



    // FIRST OF COLLECTION
    var submissionElement = document.createElement('div');
    submissionElement.setAttribute('class', 'submission ' + multiSubmission.workType);
    submissionElement.setAttribute('data-collection', dataAttribute);

    submissionElement.innerHTML = '<a href="' + multiSubmission.websiteLink + '" target="_blank"><img src="' + firstFilePath + '" alt="' + submissionAltText + '" title="' + submissionTitleText + '" loading="lazy"></a>' + submissionTitleCard + '<button data-img="' + firstFilePath + '" data-name="' + multiSubmission.prefferedName + '" data-title="' + multiSubmission.workTitle + '">Print a Poster</button>'

    submissionSection.appendChild(submissionElement);



    // REST OF COLLECTION
    for (let i = 2; i < (multiAmount + 1); i ++) {
        var followUpElement = document.createElement('div');
        followUpElement.setAttribute('class', 'submission ' + multiSubmission.workType);
        followUpElement.setAttribute('data-collection', dataAttribute);

        var followUpFilePath = generateFollowUpFilePath(multiSubmission.filePath, i, multiSubmission.fileExtension);

        followUpElement.innerHTML = '<a href="' + multiSubmission.websiteLink + '" target="_blank"><img src="' + followUpFilePath + '" alt="' + submissionAltText + '" title="' + submissionTitleText + '" loading="lazy"></a> <h4>' + multiSubmission.prefferedName + '</h4> <h5>' + multiSubmission.workTitle + ' ' + i + '</h5> <button data-img="' + followUpFilePath + '" data-name="' + multiSubmission.prefferedName + '" data-title="' + multiSubmission.workTitle + '">Print a Poster</button>'

        submissionSection.appendChild(followUpElement);
    }
}









// SINGULAR
function generateFilePath(filePath, fileExtension) {
    return 'https://maxmainio.github.io/sort-later-dev/library/student-work/' + filePath + fileExtension;
}

function generateTitleCardWith(prefferedName, workTitle, description) {
    description = description.split('\n').join('<br>');

    return '<h4>' + prefferedName + '</h4> <h5>' + workTitle + '</h5> <p>' + description + '</p>'
}

function generateTitleCardWithOut(prefferedName, workTitle) {
    return '<h4>' + prefferedName + '</h4> <h5>' + workTitle + '</h5>'
}



// MULTIPLE
function generateFirstFilePath(filePath, fileExtension) {
    return 'https://maxmainio.github.io/sort-later-dev/library/student-work/' + filePath + '-1' + fileExtension;
}

function generateFollowUpFilePath(filePath, index, fileExtension) {
    return 'https://maxmainio.github.io/sort-later-dev/library/student-work/' + filePath + '-' + index + fileExtension;
}

function generateMultiTitleCardWith(prefferedName, workTitle, description) {
    description = description.split('\n').join('<br>');

    return '<h4>' + prefferedName + '</h4> <h5>' + workTitle + ' 1</h5> <p>' + description + '</p>'
}

function generateMultiTitleCardWithOut(prefferedName, workTitle) {
    return '<h4>' + prefferedName + '</h4> <h5>' + workTitle + ' 1 </h5>'
}



// GLOBAL
function generateDataAttribute(prefferedName, workTitle) {
    var dataString = prefferedName + '-' + workTitle;
    var dataString = dataString.replace(/\s+/g, '-').toLowerCase();
    var dataString = dataString.replace(/[^a-zA-Z0-9]/g, '')

    return dataString;
}



function generateAltTextWith(prefferedName, workTitle, workType, yearCreated, description) {
return prefferedName + ': ' + workTitle + ', ' + workType + ' ' + yearCreated + ', ' + description;
}

function generateAltTextWithOut(prefferedName, workTitle, workType, yearCreated) {
    return prefferedName + ': ' + workTitle + ', ' + workType + ' ' + yearCreated;
}



function generateTitleTextWith(prefferedName, workTitle, workType, yearCreated, description) {
    return prefferedName + '&#013;' + workTitle + '&#013;&#013;' + workType + '&#013;' + yearCreated + '&#013;&#013;' + description;
}

function generateTitleTextWithOut(prefferedName, workTitle, workType, yearCreated) {
    return prefferedName + '&#013;' + workTitle + '&#013;&#013;' + workType + '&#013;' + yearCreated;
}









// HOVER ALL OF SAME COLLECTION
setTimeout(() => {
    document.querySelectorAll('[data-collection]').forEach(item => {
        item.addEventListener('mouseover', event => {
            var collection = event.target.closest('.submission').dataset.collection;
    
            document.querySelectorAll('[data-collection=' + collection + ']').forEach((element) => {
                element.classList.add('hovering');
            });
        })
    
        item.addEventListener('mouseout', event => {
            var collection = event.target.closest('.submission').dataset.collection;
    
            document.querySelectorAll('[data-collection=' + collection + ']').forEach((element) => {
                element.classList.remove('hovering');
            });
        })
    })

    document.querySelectorAll('button').forEach(item => {
        item.addEventListener('click', event => {
            generateSelectedPoster(event.target);
        })
    })
}, 1000);









// CHECKBOXES    ---------------------------------------------------------------------------------------------------------
function allFilterClick(){
    if (allBtn.checked === true) {
        filterBtn.forEach(element => {
            element.checked = true;
        });
    } else {
        filterBtn.forEach(element => {
            element.checked = false;
        });
    };
};

filterBtn.forEach(element => {
    element.addEventListener('click', event => {
        parseFilters();
    });
});

function parseFilters(){
    for (let i = 0; i < filterBtn.length; i++) {
        if (filterBtn[i].checked === false) {
            allBtn.checked = false;
            return true;
        }
    }
    allBtn.checked = true;
    return false;
};



















// GENERATES RANDOM INTEGER BETWEEN TWO VALUES    ------------------------------------------------------------------------
function randomIntFromInterval(min, max) {
    return Math.floor(Math.random() * (max - min + 1) + min);
}



// GRADIENTS    ----------------------------------------------------------------------------------------------------------
const gradient0 = [];
gradient0[0] = '#94ff3f';
gradient0[1] = '#ffff00';
gradient0[2] = '#ccc';
gradient0[3] = '#fff';

const gradient1 = [];
gradient1[0] = '#ff77be';
gradient1[1] = '#abff62';
gradient1[2] = '#ff9145';
gradient1[3] = '#fff';

const gradient2 = [];
gradient2[0] = '#b3b3b3';
gradient2[1] = '#ff96e0';
gradient2[2] = '#ffff00';
gradient2[3] = '#fff';

const gradient3 = [];
gradient3[0] = '#bfffb4';
gradient3[1] = '#3fc1ff';
gradient3[2] = '#ff7fdf';
gradient3[3] = '#fff';

const gradient4 = [];
gradient4[0] = '#c465ff';
gradient4[1] = '#f0008d';
gradient4[2] = '#fff';