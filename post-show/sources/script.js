console.log('https://www.youtube.com/watch?v=NuAKnbIr6TE');

const favicon = document.querySelector("link[rel~='icon']");

const studentsSlide = document.getElementById('students');
const workSlide = document.getElementById('work');

const falseFile = document.getElementById('false-file');

// const coverGradient = document.getElementById('cover-gradient');
// const studentSection = document.getElementById('student-section');

const submissionSection = document.getElementById('submission-section');









// ON LOAD --------------------------------------------------------------------------------------------
window.onload = (event) => {
    favicon.href = 'assets/favicons/favicon-' + randomIntFromInterval(1, 10) + '.ico';
    falseFile.style.setProperty("background-image", getRandomWebDots());

    // coverGradient.style.height = setCoverGradientHeight();
    // coverGradient.style.background = generateGradient();
    workSlide.style.background = generateGradient();
    setStudentWork();
}

// window.addEventListener('resize', e => {
//     coverGradient.style.height = setCoverGradientHeight();
// })









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









// GENERATE GRADIENT    -------------------------------------------------------------------------------
function setStudentWork(){
    fetch('https://maxmainio.github.io/sort-later-dev/library/json/work.json')
    .then((response) => response.json())
    .then((json) => {
        // console.log(json);

        for (let i = 0; i < json.length; i ++) {
            // var studentSubmission = json[i];

            if (json[i].fileNumber != 1) {
                // generateMultiple(json[i]);
            } else {
                var generatedSubmission = generateSingular(json[i]);
            }

            

            // var submissionElement = document.createElement('div');
            // submissionElement.setAttribute('class', 'submission');
            // submissionElement.innerHTML = '<a href="' + studentSubmission.websiteLink + '" target="_blank"><img src="https://maxmainio.github.io/sort-later-dev/library/student-work/' + studentSubmission.filePath + studentSubmission.fileExtension + '" alt="' + studentSubmission.prefferedName + ': ' + studentSubmission.workTitle + ', ' + studentSubmission.workType + ' ' + studentSubmission.yearCreated + ', ' + studentSubmission.workDescription + '" title="' + studentSubmission.prefferedName + '&#013;' + studentSubmission.workTitle + '&#013;&#013;' + studentSubmission.workType + '&#013;' + studentSubmission.yearCreated + '&#013;&#013;' + studentSubmission.workDescription + '" loading="lazy"></a> <h4>' + studentSubmission.prefferedName + '</h4> <h5>' + studentSubmission.workTitle + '</h5> <p>' + studentSubmission.workDescription + '</p>'





            // submissionSection.appendChild(submissionElement);
        }
    });
}










function generateSingular(singleSubmission) {
    var submissionFilePath = generateFilePath(singleSubmission.filePath, singleSubmission.fileExtension);
    // console.log(submissionFilePath);

    var submissionAltText = generateAltText(singleSubmission.prefferedName, singleSubmission.workTitle, singleSubmission.workType, singleSubmission.yearCreated, singleSubmission.workDescription);
    // console.log(submissionAltText);

    var submissionTitleText = generateTitleText(singleSubmission.prefferedName, singleSubmission.workTitle, singleSubmission.workType, singleSubmission.yearCreated, singleSubmission.workDescription);
    // console.log(submissionTitleText);

    if (singleSubmission.description === 'Null') {
        var submissionTitleCard = generateTitleCardWith(singleSubmission.prefferedName, singleSubmission.workTitle, singleSubmission.description);
    } else {
        var submissionTitleCard = generateTitleCardWithOut(singleSubmission.prefferedName, singleSubmission.workTitle);
    }

    var submissionElement = document.createElement('div');
    submissionElement.setAttribute('class', 'submission');
    console.log(submissionElement);

    submissionElement.innerHTML = '<a href="' + singleSubmission.websiteLink + '" target="_blank"><img src="' + submissionFilePath + '" alt="' + submissionAltText + '" title="' + submissionTitleText + '" loading="lazy"></a>' + submissionTitleCard
    console.log(submissionElement.innerHTML);

    submissionSection.appendChild(submissionElement);
}















function generateFilePath(filePath, fileExtension) {
    return 'https://maxmainio.github.io/sort-later-dev/library/student-work/' + filePath + fileExtension;
}

function generateAltText(prefferedName, workTitle, workType, yearCreated, workDescription) {
    return prefferedName + ': ' + workTitle + ', ' + workType + ' ' + yearCreated + ', ' + workDescription;
}

function generateTitleText(prefferedName, workTitle, workType, yearCreated, workDescription) {
    return prefferedName + '&#013;' + workTitle + '&#013;&#013;' + workType + '&#013;' + yearCreated + '&#013;&#013;' + workDescription;
}

function generateTitleCardWith(prefferedName, workTitle, description) {
    return '<h4>' + prefferedName + '</h4> <h5>' + workTitle + '</h5> <p>' + description + '</p>'
}

function generateTitleCardWithOut(prefferedName, workTitle) {
    return '<h4>' + prefferedName + '</h4> <h5>' + workTitle + '</h5>'
}

































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