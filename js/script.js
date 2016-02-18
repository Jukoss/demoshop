$(document).ready(function() {

	function showProduct(top, img, name, oldPriceUa, priceUa, priceUs){ // function that builds the product-block

		var top_img = "img/top.png"; // pass to top-image

		var action = "img/action.png"; // pass to action-image

		var product = $('<div/>', { class: 'product'}); // create block product 

			var product_img = $('<div/>', { class: 'product_img'}).appendTo(product); // create block product_img

				var span = $('<span/>').appendTo(product_img); // create span for top-image

				if (top == 1) {
					var img_top = $('<img/>', { class: 'top', src: top_img }).appendTo(span); // checking if product is top
				}
					
				var img_av = $('<img/>', { class: 'avatar', src: img }).appendTo(product_img); // create block img for img-avatar
				

			if (oldPriceUa!=priceUa) { // checking if product has action

				var img_ac = $('<img/>', { class: 'action', src: action}).appendTo(product_img);  // create block img for img-action
			}

			var product_text = $('<div/>', { class: 'product_text'}).appendTo(product);

				var text_h5 = $('<h5>', { text: name}).appendTo(product_text); //create heading for title of product

				if (oldPriceUa!=priceUa) { // checking if product has action

					var text_h5action = $('<h5>').appendTo(product_text);

						var span = $('<span/>', {id: 'line-through', text: oldPriceUa}).appendTo(text_h5action); // block for oldPrice

					var text_4 = $('<h4>', {class: 'hot'}).appendTo(product_text); 

					var span = $('<span/>', {text: priceUa}).appendTo(text_4);

					var span = $('<span/>', { class: 'maney' , text: " грн."}).appendTo(text_4);

				}
				else {

					var text_3 = $('<h3>', { text: priceUa}).appendTo(product_text); //block for price in UAH

					var span = $('<span/>', { class: 'maney' , text: " грн."}).appendTo(text_3);
				}

				var text_4 = $('<h4>', { text: priceUs + " $"}).appendTo(product_text); //block for price in dollars


			return product;
	}
	
	function showArticle(head, text) {
		var div_news = $('<div/>'); // create block div for news 
			var h2 = $('<h2>', { text: head}).appendTo(div_news); //block for heading
			var h5 = $('<h5>', { text: text}).appendTo(div_news); //block for article-text
		
		return div_news;
	}	


	var products = new Object(); // empty object for data test, which later to be received from the database

	products.img = ["img/product_img1.png", "img/product_img2.png", "img/product_img3.png", // path to images
	 "img/product_img4.png", "img/product_img4.png", "img/product_img3.png", "img/product_img4.png", "img/product_img3.png"];

	products.name = ["D-Link DIR-300/NRU/ B70954 РХ 563", "D-Link DIR-300/NRU/ B70954 РХ 563", //name products
	 "D-Link DIR-300/NRU", "D-Link DIR-300/NRU/ B70954 РХ 563", "D-Link DIR-300/NRU/ B70954 РХ 563",
	  "D-Link DIR-300/NRU/ B70954 РХ 563", "D-Link DIR-300/NRU/ B70954 РХ 563",
	  "D-Link DIR-300/NRU/ B70954 РХ 563"];

	products.oldPriceUa = [2472, 3472, 2472, 2472, 2472, 3472, 2472, 3472] // price products

	products.priceUa = [2472, 2472, 2472, 2472, 2472, 2472, 2472, 2472];

	products.priceUs = [1720, 1720, 1720, 1720, 1720, 1720, 1720, 1720];

	products.top = [1, 1, 1, 1, 1, 1, 1, 1]; //bolean product is top or not


	var article = new Object();

	article.head = ["Новые горизонты от стандарта 802.11ac", "AURA HD – мультимедиа-центр развлечений и помощник для всей семьи",
	"Новые горизонты от стандарта 802.11ac", "AURA HD – мультимедиа-центр развлечений и помощник для всей семьи",
	"Новые горизонты от стандарта 802.11ac"];

	article.text = ["Основной акцент разработки – это Интернет-сервисы цифрового телевидения, количество которых постоянно растет"]

	var count=0; 					//variable for initial value of the counter
	var max=5; 						//variable that shows the maximum number of products on one page 
	var most = max; 				//variable for max value of the counter
	var num_action_product=0; 		// number of promotional products

	for (var i = 0; i < most; i++) { //loop that displays the top products when the page loads

		if (products.top[i] == 1) {

			$('.products').append(showProduct(products.top[i], products.img[i], products.name[i],  		// showProduct function call
				products.oldPriceUa[i], products.priceUa[i], products.priceUs[i]));
		}
		if (products.oldPriceUa[i]!=products.priceUa[i]) {
				num_action_product++; 		// number of promotional products
			}
		count++; 							//inc count
	};	

	$('.next').click(function(){  			// show next products

		if ($('.top_product').hasClass('selectgroup')) {  	// checking if the number of products is more then in databased
			length = products.name.length;					// that is, if buttom next is active or not
		}
		else {
			length=num_action_product;
		}
		if (count<length) {
			if (count==0) {
				count=max;
			}
			$('.products').empty();							// if active find out most value
			if (products.name.length>count+max) {
				most +=count;
			}
			else {
				most = products.name.length
			}
			for (var i = count; i < most; i++) {			// show products

				if (products.top[i] == 1) {

					$('.products').append(showProduct(products.top[i], products.img[i], products.name[i], 
						products.oldPriceUa[i], products.priceUa[i], products.priceUs[i]));
				}
				count++;		//inc count
			};
			most=count-(products.name.length-max);		//transfer counter because the numbering of elements in an array starts from zero

		}
	});	

	$('.previous').click(function(){  	//show previous product
		if (count>max) {				// checking of counter
			count= count-(products.name.length-max);
			count= count-max;
			most=count+max;
			$('.products').empty();		//empty of block products
			for (var i = count; i < most; i++) {

				if (products.top[i] == 1) {  // show products

					$('.products').append(showProduct(products.top[i], products.img[i], products.name[i], 
						products.oldPriceUa[i], products.priceUa[i], products.priceUs[i]));
				}
			};
			count=most-max;
		}
	});			

	$('.top_product').click(function(){			   				// select a category top products
		if (!$(this).hasClass('selectgroup')) {					// checking if top products has class selectgroup
			$('.action_product').removeClass('selectgroup');	// remove class selectgroup for promotional products
			$(this).addClass('selectgroup');					// add class to category for top products
			$('.products').empty();								// empty of block products
			count=0;

			for (var i = 0; i < 5; i++) {

				if (products.top[i] == 1) {						//show previous product

					$('.products').append(showProduct(products.top[i], products.img[i], products.name[i], 
						products.oldPriceUa[i], products.priceUa[i], products.priceUs[i]));
				}
				count++;
			};
		}	
	});
		
	$('.action_product').click(function(){						// select a category promotional products
		if (!$(this).hasClass('selectgroup')) {					// checking if category promotional products has class selectgroup
			$('.top_product').removeClass('selectgroup');		// remove class selectgroup for top products
			$(this).addClass('selectgroup');					// add class to category for promotional products
			$('.products').empty();
			count=0;

			
			for (var i = 0; i <products.name.length ; i++) {	//show previous product

				if (products.oldPriceUa[i]!=products.priceUa[i]) {			//checking if product is promotional
					$('.products').append(showProduct(products.top[i], products.img[i], products.name[i], 
						products.oldPriceUa[i], products.priceUa[i], products.priceUs[i]));
					count++;
				}
			};
		}	
	});						
	
	var bmp=0;

	for (var i = 0; i <7 ; i++) {	//show previous product

			$('.view_product').append(showProduct(products.top[i], products.img[i], products.name[i], 
				products.oldPriceUa[i], products.priceUa[i], products.priceUs[i]));
			bmp++;
		
	};

	$('.prod .bulletright').click(function(){
		if (bmp<products.name.length) {
			$('.view_product').empty();

			var j=0;
			var i=products.name.length-bmp;
			bmp=i;

			while (j < 7) {	//show previous product

				$('.view_product').append(showProduct(products.top[i], products.img[i], products.name[i], 
					products.oldPriceUa[i], products.priceUa[i], products.priceUs[i]));
				i++;
				j++;
				bmp++;

			
			};
		}

	});

	$('.prod .bulletleft').click(function(){
		if (bmp>7) {
			$('.view_product').empty();

			var j=0;
			var i=products.name.length-bmp;
			bmp=i;

			while (j < 7) {	//show previous product

				$('.view_product').append(showProduct(products.top[i], products.img[i], products.name[i], 
					products.oldPriceUa[i], products.priceUa[i], products.priceUs[i]));
				i++;
				j++;
				bmp++;

			
			};
		}

	});


	var a_bmp=0;

	for (var i = 0; i <4 ; i++) {	//show previous article

			$('.news').append(showArticle(article.head[i], article.text[0]));
			a_bmp++;
		
	};

	$('.info .bulletright').click(function(){
		if (a_bmp<article.head.length) {
			$('.news').empty();

			var j=0;
			var i=article.head.length-a_bmp;
			a_bmp=i;

			while (j < 4) {	//show previous article
				$('.news').append(showArticle(article.head[i], article.text[0]));
				i++;
				j++;
				a_bmp++;

			
			};
		}

	});

	$('.info .bulletleft').click(function(){
		if (a_bmp>4) {
			$('.news').empty();

			var j=0;
			var i=article.head.length-a_bmp;
			a_bmp=i;

			while (j < 4) {	//show previous article

				$('.news').append(showArticle(article.head[i], article.text[0]));
				i++;
				j++;
				a_bmp++;

			
			};
		}

	});
	
	// ----------------------

}); // end ready!!!