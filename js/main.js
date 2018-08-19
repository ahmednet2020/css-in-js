//var in sass
let mainColor ="#ff0";
let sliderNumber = 1;
//style element in html ref
let sliderStyle = document.head.appendChild(document.createElement('style'));
let buttonStyle = document.head.appendChild(document.createElement('style'));
let rootStyle = document.head.appendChild(document.createElement('style'));
//css var update bye js 
function style(){
	const root = `
		:root
		{
			--color:${mainColor};
			--size:20px;
		}
`;
 	rootStyle.textContent = root
}
style();
//css-in-js with es6 string 
const slider = `
	.slider {
			position: relative;
			height: 200px;
		    background: var(--color);
		    color:#fff;
			transition:background 0.2s ease-in;
		    text-align: center;
		    overflow: hidden;
		    white-space: nowrap;
		    display: block;
		}
	`;
const slideritem = `
		.slider-item {
			width: 100%;
		    height: 100%;
		    transition: 1s;
		    display: inline-block;
			transform: translateX(-100%);
			position: absolute;
		    top: 0;
		    left: 0;
		    right: 0;
		    bottom: 0;
		    z-index: 9;
		}
	`;
function sliderActivefn()
{
	const sliderActive = `
		.slider-item:nth-child(${sliderNumber})
		{
			transform: translateX(0)
		}
		.slider-item:nth-child(${sliderNumber}) ~ .slider-item
		{
			transform: translateX(100%)
		}
	`;
	sliderStyle.textContent = sliderActive
}
sliderActivefn();
const btnStyle = `
	.btn-in-js {
		padding:10px 20px;
		background-color:var(--color);
		color:#fff;
		${boxshadow(`0 0 5px 5px #ccc`, `0 0 10px 10px var(--color)`)}
		${border({color:'var(--color)', fx:'lol'})}
	}
`;
const button = {
		'background-color':'red',
		...btn(),
		'overflow':'hidden'
	}
// maxin in scss
function boxshadow(...rest) {
	return `
	box-shadow:${rest};
	-webki-box-shadow:${rest};
	-moz-box-shadow:${rest};
	`;
}
//main with default value 
function border({size = '1px', style = 'solid', color = '#f0f'})
{
	return `border:${size} ${style} ${color}`;
}
//objec css style
function btn()
{
	return {
		'font-size':'20px',
		'line-height':'2',
		'transition':'background 0.2s ease-in'
	}
}
//convert js object to css string
function cssToString(name,css)
{
	return `${name} ${JSON.stringify(button).replace(/,/g,';').replace(/"/g,'')}`
}
//add style to page
buttonStyle.textContent = btnStyle + cssToString('button',button) + slideritem + slider;
setInterval(() => {
	if(sliderNumber >= 3) sliderNumber = 0;
	mainColor =`#${Math.floor(Math.random()*999999)}`;
	sliderNumber = sliderNumber + 1;
	sliderActivefn();
	style();
},3000);