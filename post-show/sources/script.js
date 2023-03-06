console.log('https://www.youtube.com/watch?v=NuAKnbIr6TE');

const favicon = document.querySelector("link[rel~='icon']");

const studentsSlide = document.getElementById('students');
const workSlide = document.getElementById('work');

const falseFile = document.getElementById('false-file');

const submissionSection = document.getElementById('submission-section');









// ON LOAD --------------------------------------------------------------------------------------------
window.onload = (event) => {
    favicon.href = 'assets/favicons/favicon-' + randomIntFromInterval(1, 10) + '.ico';
    falseFile.style.setProperty("background-image", getRandomWebDots());

    workSlide.style.background = generateGradient();
    setStudentWork();
}









// GENERATE DOTS    -----------------------------------------------------------------------------------
function getRandomWebDots() {
    var dotNum = randomIntFromInterval(1, 3);
    var dotPath = 'url(assets/web-svg/dots-web-' + dotNum.toString() + '.svg';
    return dotPath
}









// CLICK ON STUDENTS / CREDITS PAGE -------------------------------------------------------------------
studentsSlide.addEventListener('click', e => {
    studentsSlide.classList.add('animatable');
    workSlide.classList.add('animatable');

    studentsSlide.classList.remove('removed');
    workSlide.classList.remove('removed');

    setTimeout(() => {
        studentsSlide.classList.remove('animatable')
        workSlide.classList.remove('animatable')
    },500);
})

// CLICK ON WORK PAGE ---------------------------------------------------------------------------------
workSlide.addEventListener('click', e => {
    studentsSlide.classList.add('animatable');
    workSlide.classList.add('animatable');

    studentsSlide.classList.add('removed');
    workSlide.classList.remove('removed');

    setTimeout(() => {
        studentsSlide.classList.remove('animatable');
        workSlide.classList.remove('animatable');
    },500);
})









// GENERATE GRADIENT    -------------------------------------------------------------------------------
function generateGradient(){
    // GETS RANDOM GRADIENT BY NAME AS STRING
    var gradTag = 'gradient' + randomIntFromInterval(0, 4);
    // ARRAY OF THE INDIVIDUAL COLORS OF SELECTED GRADIENT
    var gradColors = eval(gradTag);
    var gradSteps = gradColors.length;

    var gradPlacements = [];
    var min = 0;
    var max = 100;
    var offset = 0;

    // THIS GENERATES THE POSITIONS FOR EACH OCLOR
    for (var i = 0; i < gradSteps; i ++) {
        var wiggleRoom = 10 * (gradSteps - i);

        min = 0 + offset;
        max = 100;
        max = max - wiggleRoom;

        placement = randomIntFromInterval(min, max);
        gradPlacements[i] = placement
        offset = placement + 10;
    }

    // PREPARE THE CSS EXPRESSION OF NEW GRADIENT
    var lause = 'linear-gradient(' + flipACoin();

    // THIS DECIDES DIRECTION OF THE GRADIENT
    function flipACoin(){
        var coinFlip = Math.round(Math.random());
        if (coinFlip == 1) {
            return '0deg';
        } else {
            return '180deg';
        }
    }

    // GENERATES THE PROPER CSS EXPRESSION FOR THE GRADIENT
    for (var i=0; i < gradSteps; i++) {
        var appendable = gradColors[i] + ' ' + gradPlacements[i] + '%'
        lause = lause + ', ' + appendable
    }

    // RETURN THE FORMULA FOR THE GRADIENT
    return(lause + ')');
}

function setCoverGradientHeight() {
    var heightToSet = studentSection.offsetHeight;
    coverGradient.style.height = heightToSet + 'px';
}









// GENERATE LIST OF SUBMITTED WORKS    ----------------------------------------------------------------
function setStudentWork(){
    fetch('https://maxmainio.github.io/sort-later-dev/library/json/work.json')
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









// GENERATE SINGULAR SUBMISSION    --------------------------------------------------------------------
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
    submissionElement.setAttribute('class', 'submission');

    submissionElement.innerHTML = '<a href="' + singleSubmission.websiteLink + '" target="_blank"><img src="' + submissionFilePath + '" alt="' + submissionAltText + '" title="' + submissionTitleText + '" loading="lazy"></a>' + submissionTitleCard

    submissionSection.appendChild(submissionElement);
}





// GENERATE MULTIPLE SUBMISSION    --------------------------------------------------------------------
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



    // GENERATE FIRST OF COLLECTION    ------------------------------------------------------------
    var submissionElement = document.createElement('div');
    submissionElement.setAttribute('class', 'submission');
    submissionElement.setAttribute('data-collection', dataAttribute);

    submissionElement.innerHTML = '<a href="' + multiSubmission.websiteLink + '" target="_blank"><img src="' + firstFilePath + '" alt="' + submissionAltText + '" title="' + submissionTitleText + '" loading="lazy"></a>' + submissionTitleCard

    submissionSection.appendChild(submissionElement);



    // GENERATE REST OF COLLECTION    -----------------------------------------------------------------
    for (let i = 2; i < (multiAmount + 1); i ++) {
        var followUpElement = document.createElement('div');
        followUpElement.setAttribute('class', 'submission');
        followUpElement.setAttribute('data-collection', dataAttribute);

        var followUpFilePath = generateFollowUpFilePath(multiSubmission.filePath, i, multiSubmission.fileExtension);

        followUpElement.innerHTML = '<a href="' + multiSubmission.websiteLink + '" target="_blank"><img src="' + followUpFilePath + '" alt="' + submissionAltText + '" title="' + submissionTitleText + '" loading="lazy"></a> <h4>' + multiSubmission.prefferedName + '</h4> <h5>' + multiSubmission.workTitle + ' ' + i + '</h5>'

        submissionSection.appendChild(followUpElement);
    }
}















function generateFilePath(filePath, fileExtension) {
    return 'https://maxmainio.github.io/sort-later-dev/library/student-work/' + filePath + fileExtension;
}

function generateFirstFilePath(filePath, fileExtension) {
    return 'https://maxmainio.github.io/sort-later-dev/library/student-work/' + filePath + '-1' + fileExtension;
}
function generateFollowUpFilePath(filePath, index, fileExtension) {
    return 'https://maxmainio.github.io/sort-later-dev/library/student-work/' + filePath + '-' + index + fileExtension;
}



function generateDataAttribute(prefferedName, workTitle) {
    var dataString = prefferedName + '-' + workTitle;
    var dataString = dataString.replace(/\s+/g, '-').toLowerCase();
    var dataString = dataString.replace(/[^a-zA-Z0-9]/g, '')

    return dataString;
}



function generateTitleCardWith(prefferedName, workTitle, description) {
    description = description.split('\n').join('<br>');

    return '<h4>' + prefferedName + '</h4> <h5>' + workTitle + '</h5> <p>' + description + '</p>'
}

function generateMultiTitleCardWith(prefferedName, workTitle, description) {
    description = description.split('\n').join('<br>');

    return '<h4>' + prefferedName + '</h4> <h5>' + workTitle + ' 1</h5> <p>' + description + '</p>'
}

function generateAltTextWith(prefferedName, workTitle, workType, yearCreated, description) {
return prefferedName + ': ' + workTitle + ', ' + workType + ' ' + yearCreated + ', ' + description;
}

function generateTitleTextWith(prefferedName, workTitle, workType, yearCreated, description) {
    return prefferedName + '&#013;' + workTitle + '&#013;&#013;' + workType + '&#013;' + yearCreated + '&#013;&#013;' + description;
}



function generateTitleCardWithOut(prefferedName, workTitle) {
    return '<h4>' + prefferedName + '</h4> <h5>' + workTitle + '</h5>'
}

function generateMultiTitleCardWithOut(prefferedName, workTitle) {
    return '<h4>' + prefferedName + '</h4> <h5>' + workTitle + ' 1 </h5>'
}

function generateAltTextWithOut(prefferedName, workTitle, workType, yearCreated) {
    return prefferedName + ': ' + workTitle + ', ' + workType + ' ' + yearCreated;
}

function generateTitleTextWithOut(prefferedName, workTitle, workType, yearCreated) {
    return prefferedName + '&#013;' + workTitle + '&#013;&#013;' + workType + '&#013;' + yearCreated;
}


















// HOVER ALL OF SAME COLLECTION    --------------------------------------------------------------------
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
}, 1000);




































// GENERATES RANDOM INTEGER BETWEEN TWO VALUES    -----------------------------------------------------
function randomIntFromInterval(min, max) {
    return Math.floor(Math.random() * (max - min + 1) + min);
}



// GRADIENTS    ---------------------------------------------------------------------------------------
const gradient0 = [];
gradient0[0] = '#94ff3f';
gradient0[1] = '#ffff00';
gradient0[2] = '#ccc';
gradient0[3] = '#fff';

const gradient1 = [];
gradient1[0] = '#fff';
gradient1[1] = '#ff9145';
gradient1[2] = '#abff62';
gradient1[3] = '#ff77be';

const gradient2 = [];
gradient2[0] = '#fff';
gradient2[1] = '#ffff00';
gradient2[2] = '#ff96e0';
gradient2[3] = '#b3b3b3';

const gradient3 = [];
gradient3[0] = '#fff';
gradient3[1] = '#ff7fdf';
gradient3[2] = '#3fc1ff';
gradient3[3] = '#bfffb4';

const gradient4 = [];
gradient4[0] = '#fff';
gradient4[1] = '#f0008d';
gradient4[2] = '#c465ff';