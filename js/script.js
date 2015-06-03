
function loadData() {

    var $body = $('body');
    var $wikiElem = $('#wikipedia-links');
    var $nytHeaderElem = $('#nytimes-header');
    var $nytElem = $('#nytimes-articles');
    var $greeting = $('#greeting');

    // clear out old data before new request
    $wikiElem.text("");
    $nytElem.text("");

    // get streetview image url
    var streetStr = $('#street').val();
    var cityStr = $('#city').val();
    var address = streetStr + ',' + cityStr;
    $greeting.text('So you want to live at ' + address + '?');
    var streetviewUrl = 'https://maps.googleapis.com/maps/api/streetview?size=600x400&location=' + address + '';
    $body.append('<img class="bgimg" src="' + streetviewUrl + '">');

    // NY Times AJAX request
    // http://api.nytimes.com/svc/search/v2/articlesearch.json?q=new+york+times&page=2&sort=oldest&api-key=####
    // <li class="article"><a href='#'>Link to Article</a><p>Text of first paragraph</p></li>
    var NYtimesApiKey = '0ecda6d95b828817edbcfef8445c1aeb:7:72206312';
    var NYtimesBaseUrl = 'http://api.nytimes.com/svc/search/v2/articlesearch.json';
    var query = cityStr;
    var URL =  NYtimesBaseUrl + '?q=' + query + '&sort=newest&' + '&api-key=' + NYtimesApiKey;

    $.getJSON(URL, function (data) {
    	$nytHeaderElem.text('New York Times Articles About ' + cityStr);
    	var articles = data.response.docs;
    	$.each( articles, function( i, article) {
            $nytElem.append('<li class="article"><a href=' + article.web_url + '>' + article.headline.main + '</a><p>' + article.snippet + '</p></li>');
        });
    });

    return false;
};

$('#form-container').submit(loadData);
