$(document).ready(function(){
    $("#search a").on("click", function(){
        $("#main").addClass("searching");
        $("#search").html("<form><input class='text' type='text' placeholder='Write here and then press Enter or click --->'><input class='button' type='submit' value='search'></form>");
        $(".text").focus();
    });

    $("#search").on("click", ".button", function(event){
        event.preventDefault();
        var input = $(".text").val();
        var wiki_url = "https://en.wikipedia.org//w/api.php?action=query&format=json&prop=pageimages%7Cextracts&list=&titles=&generator=search&piprop=original&pithumbsize=200&pilimit=9&exsentences=3&exlimit=9&exintro=1&explaintext=1&gsrnamespace=0&gsrlimit=9&gsrwhat=text&origin=*&gsrsearch=" + input;
        $("#results").empty();
        $(".xxx").remove();
        $.ajax(wiki_url,{

            success: function(data){
                $.each(data.query.pages, function(i){
                    if (data.query.pages[i].thumbnail === undefined){
                        $("#results").append("<a href='https://en.wikipedia.org/?curid="+data.query.pages[i].pageid+"' target='_blank'><figure><img src='http://placekitten.com/160/120' alt='"+data.query.pages[i].title+"'/><figcaption><h2>"+data.query.pages[i].title+"</h2><p>"+data.query.pages[i].extract+"</p></figcaption></figure></a>");
                    } else {
                        $("#results").append("<a href='https://en.wikipedia.org/?curid=" + data.query.pages[i].pageid + "' target='_blank'><figure><img src='" + data.query.pages[i].thumbnail.original + "' alt='" + data.query.pages[i].title + "'/><figcaption><h2>" + data.query.pages[i].title + "</h2><p>" + data.query.pages[i].extract + "</p></figcaption></figure></a>");
                    }
                });
            }
        });
        $("#search").append("<div class='xxx'>X</div>");
    });

    $("#search").on("keypress", function(key){
        if (key.which == 13){
            $("#search").on("click", ".button");
        }
    });

    $("#search").on("click", ".xxx", function(){
        $("#results").empty();
        $(".text").val("");
        $(".text").focus();
    });
});
