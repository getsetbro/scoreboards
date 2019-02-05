var myapp = {
  spListName: "SethVSmatt",
  res: null,
  scoreSB: 0,
  scoreMM: 0,
  whoScored: null,
  pointReason: null,
  digest: null,
  dateArr: null,
  convertDate: function(elCreated) {
    myapp.dateArr = elCreated.substring(0, 10).split("-");
    return myapp.dateArr[1] + "." + myapp.dateArr[2] + "." + myapp.dateArr[0];
  },
  onsuccess: function(data) {
    (myapp.res = ""), (myapp.scoreSB = 0), (myapp.scoreMM = 0);

    $.each(data.d.results, function(indx, el) {
      console.log(el);
      myapp.res +=
        '<tr><td class="' +
        el.team_name.substring(0, 3) +
        '">' +
        el["team_name"] +
        "</td><td>" +
        el["Title"] +
        "</td><td>" +
        myapp.convertDate(el["Created"]) +
        "</td></tr>";
      if (el["team_name"] === "Seth B.") {
        myapp.scoreSB++;
      }
      if (el["team_name"] === "Matt Mc.") {
        myapp.scoreMM++;
      }
    });
    $("#lsb-tbody").html(myapp.res);
    $("#scoreSB").html((" " + myapp.scoreSB).slice(-2));
    $("#scoreMM").html((" " + myapp.scoreMM).slice(-2));
  },
  getitems: function() {
    // $.ajax({
    // 	url: "/personal/seth_broweleit/_api/web/lists/GetByTitle('"+myapp.spListName+"')/items?$orderby=Created desc",
    // 	type: "GET",
    // 	dataType:"json",
    // 	headers: {"accept": "application/json;odata=verbose"},
    // 	success: myapp.onsuccess,
    // 	error: function (xhr) {alert(xhr.status + ': ' + xhr.statusText);}
    // });
    let fake = {
      d: {
        results: [
          {
            team_name: "Seth B.",
            Title: "For keeping this thing alive",
            Created: new Date().toISOString()
          }
        ]
      }
    };
    myapp.onsuccess(fake);
  },
  addsuccess: function(data) {
    $(".addform").slideUp();
    myapp.getitems();
  },
  addOne: function() {
    var jsono = {
      __metadata: { type: "SP.Data." + myapp.spListName + "ListItem" },
      Title: myapp.pointReason,
      team_name: myapp.whoScored
    };

    // $.ajax({
    // 	url: "/personal/seth_broweleit/_api/web/lists/GetByTitle('"+myapp.spListName+"')/items",
    // 	type: "POST",
    // 	dataType:"json",
    // 	contentType: "application/json;odata=verbose",//took a while to find this was needed
    // 	headers: { "accept": "application/json;odata=verbose", "x-requestdigest": myapp.digest, "x-requestforceauthentication": true, "If-Match": "*" },
    // 	data: JSON.stringify(jsono),
    // 	success: myapp.addsuccess,
    // 	error: function (xhr) {
    // 		var obj = jQuery.parseJSON(xhr.responseText);
    // 		alert(obj.error.message.value + ' Or text is too long.');
    // 	}
    // });
  },
  init: function() {
    myapp.getitems();
    //hide from windows phone what it cant display
    if (navigator.userAgent.match(/Windows Phone/)) {
      $(".lsb-zeros").hide();
    }

    $(".addone").click(function() {
      $(".addform").slideDown();
      myapp.whoScored = $(this).attr("data-team");
      $("#theWho").html(myapp.whoScored + "'s");
    });

    $("#lsbAdd").click(function() {
      myapp.pointReason = $("#lsbReason").val();
      if (myapp.pointReason.length) {
        myapp.addOne();
      } else {
        alert("Please enter a reason");
      }
    });
    //get digest for adding to list later

    // $.ajax({
    // 	url: "/personal/seth_broweleit/_api/contextinfo",
    // 	type: "POST",
    // 	dataType:"json",
    // 	contentType: "application/x-www-url-encoded",
    // 	headers: { "accept": "application/json;odata=verbose"},
    // 	success: function (data) {
    // 		if(data.d){
    // 			myapp.digest = data.d.GetContextWebInformation.FormDigestValue;
    // 		}
    // 	},
    // 	error: function (xhr) {alert(xhr.status + ': ' + xhr.statusText);}
    // });
  }
};
myapp.init();
