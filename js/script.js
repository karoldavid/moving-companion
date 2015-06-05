
function loadData() {

    var $body = $('body');
    var $wikiElem = $('#wikipedia-links');
    var $nytHeaderElem = $('#nytimes-header');
    var $nytElem = $('#nytimes-articles');
    var $greeting = $('#greeting');

    // clear out old data before new request
    $wikiElem.text("");
    $nytElem.text("");

    // load streetview
    var streetStr = $('#street').val();
    var cityStr = $('#city').val();
    var address = streetStr + ',' + cityStr;
    $greeting.text('So, you want to live at ' + address + '?');
    var streetviewUrl = 'https://maps.googleapis.com/maps/api/streetview?size=600x400&location=' + address + '';
    $body.append('<img class="bgimg" src="' + streetviewUrl + '">');

    // load nytimes
    var nytApiKey = '0ecda6d95b828817edbcfef8445c1aeb:7:72206312';
    var nytBaseUrl = 'http://api.nytimes.com/svc/search/v2/articlesearch.json';
    var query = cityStr;
    var nytUrl = nytBaseUrl + '?q=' + query + '&sort=newest&' + '&api-key=' + nytApiKey;
    
    $.getJSON(nytUrl, function (data) {
    	$nytHeaderElem.text('New York Times Articles About ' + cityStr);
    	var articles = data.response.docs;
    	$.each( articles, function( i, article) {
            $nytElem.append('<li class="article"><a href=' + article.web_url + '>' + article.headline.main + '</a><p>' + article.snippet + '</p></li>');
        });
    }).error(function(e) {
    	$nytHeaderElem.text('Sorry, An Error Occured. New York Times Articles Could Not Be Loaded.');
    });

    // load wikipedia data
    // jQuery.ajax( url [, settings ] )
    // http://en.wikipedia.org/w/api.php?action=query&titles=Main%20Page&prop=revisions&rvprop=content&format=json

    var query = cityStr,
        dt = 'jsonp',
        wikiBase = 'http://en.wikipedia.org/w/api.php',
        wikiUrl = wikiBase + '?action=opensearch&search=' + query + '&format=json&callback=wikiCallback';

    var wikiRequestTimeout = setTimeout(function() {
    	$wikiElem.text('failed to get Wikipedia resources');
    }, 8000);

    var x = $.ajax({
    	      url: wikiUrl,
    	      dataType: dt,
    	      success: function(response){
    	                 var articleList = response[1];
    	                 for (var i = 0; i < articleList.length; i++) {
    	                 	var articleStr = articleList[i],
    	                 	    url = 'http://en.wikipedia.org/wiki/' + articleStr;
    	                 	$wikiElem.append('<li><a href="' + url + '">' + articleStr + '</a></li>');
    	                 };
    	                 clearTimeout(wikiRequestTimeout);
    	               }
            });

    return false;
};

$('#form-container').submit(loadData);
