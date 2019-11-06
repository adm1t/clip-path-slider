let images = [], arrows = [];
let prevImg = {val: ""}, nextImg = {val: ""}, currentImg;

window.addEventListener('load', function() {

	let promise = new Promise((resolve) => {

		images = document.querySelectorAll(".slide");
		updImgClasses(images[0]);
		resolve();
	});

	promise.then(() => {

		arrows = [
			{
				element: document.querySelector(".arrow.arrow_prev"),
				curImgTempClassname: "slide_prev-left",
				newImgTempClassname: "slide_current-right",
				newImg: nextImg,
				unusedImg: prevImg
			},
			{
				element: document.querySelector(".arrow.arrow_next"),
				curImgTempClassname: "slide_prev-right",
				newImgTempClassname: "slide_current-left",
				newImg: prevImg,
				unusedImg: nextImg
			}
		];

		arrows.forEach((item) => {
			item.element.addEventListener('click', () => {
				arrowClickHandler(item);
			});
		});
	});
});

function updImgClasses(curImg){

	currentImg = curImg;
	currentImg.setAttribute("class", "slide slide_current");
	
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

	prevImg.val.setAttribute("class", "slide slide_next-left");
	nextImg.val.setAttribute("class", "slide slide_next-right");
};

function arrowClickHandler(thisArrow){

	document.querySelectorAll(".arrow").forEach((item) => {
		item.classList.add("arrow_disabled");
	});

	currentImg.classList.add(thisArrow.curImgTempClassname);
	thisArrow.newImg.val.classList.add(thisArrow.newImgTempClassname);

	setTimeout(() => {
		currentImg.classList = "";
		thisArrow.unusedImg.val.setAttribute("class", 'slide');
		updImgClasses(thisArrow.newImg.val);

		document.querySelectorAll(".arrow").forEach((item) => {
			item.classList.remove("arrow_disabled");
		});

	}, 500);
};
