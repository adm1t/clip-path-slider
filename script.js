let images = [], arrows = [];
let prevImg = {val: ""}, nextImg = {val: ""}, currentImg;

window.addEventListener('load', function() {

    let promise = new Promise((resolve) => {

        images = document.querySelectorAll(".img-container img");
        updImgClasses(images[getRandomInt(0, images.length - 1)]);
        resolve();

    });
    promise.then(()=> {

        arrows = [
            {
                element: document.querySelector(".arrow.left-arrow"),
                curImgTempClassname: "prev-left-item",
                newImgTempClassname: "current-right-item",
                newImg: nextImg,
                unusedImg: prevImg
            },
            {
                element: document.querySelector(".arrow.right-arrow"),
                curImgTempClassname: "prev-right-item",
                newImgTempClassname: "current-left-item",
                newImg: prevImg,
                unusedImg: nextImg
            }
        ];

        arrows.forEach((item) => {
            item.element.addEventListener('click', ()=>{
                arrowClickHandler(item);
            });
        });
    });
});

function getRandomInt(min, max){
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

function updImgClasses(curImg){

    currentImg = curImg;
    currentImg.classList = "current-img";
	
	switch(curImg){
		
		case images[0]:
		    prevImg.val = images[images.length - 1];
            nextImg.val = curImg.nextElementSibling;
            break;
		
		case images[images.length - 1]:
			prevImg.val = curImg.previousElementSibling;
			nextImg.val = images[0];
			break;
			
		default:
			prevImg.val = curImg.previousElementSibling;
			nextImg.val = curImg.nextElementSibling;
	}

    prevImg.val.classList = "next-left-img";
    nextImg.val.classList = "next-right-img";

};

function arrowClickHandler(thisArrow){

    document.querySelectorAll(".arrow").forEach((item) => {
        item.classList.add("arrow-disabled");
    });

    currentImg.classList.add(thisArrow.curImgTempClassname);
    thisArrow.newImg.val.classList.add(thisArrow.newImgTempClassname);

    setTimeout(() => {
        currentImg.classList = "";
        thisArrow.unusedImg.val.classList = "";
        updImgClasses(thisArrow.newImg.val);

        document.querySelectorAll(".arrow").forEach((item) => {
            item.classList.remove("arrow-disabled");
        });

    }, 500);
};
