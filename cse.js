  var tab1name = 'audio';  
  var tab2name = 'movies';  
  var tab3name = 'wikipedia';  
  var tab4name = 'thinkphp';  

  var audio;
  var video;
  var wikipedia;
  var thinkphp;

  var loader;

  var selectedBtn;


  var address3 = "http://www.google.com/cse?cx=016645936221120843102%3Ahpnlgzllwts&ie=UTF-8&q=ajax&sa=Search";

  var address1 = "http://www.google.com/custom?hl=en&client=google-coop-np&cof=FORID:13%3BAH:left%3BS:http://thinkphp.ro/cse%3BCX:Thinkphp%2520Search%2520Engine%3BL:http://thinkphp.ro/cse/images/logo.png%3BLH:100%3BLP:1%3BVLC:%23551A8B%3BDIV:%23CCCCCC%3B&adkw=AELymgWTEEqwtK0kGVWzFJDGbNVJ2n-oRCEIg-w8asVh9jNMadmAMqum778jVCVJrATfvxOdrgWMqTZ4t60krhWxddda-5HGKQqvxH3_UeYa93-6VmexMcHaP7EygtYDQQh6nmXTmScU&boostcse=0&q=";

  var more = "+more:";

  var address2 = "&cx=016645936221120843102:hpnlgzllwts&sa=N&ei=CgCsSv27DIGc_AayjoHSBg&oi=coopctx&resnum=0&ct=col3&cd=1";

  //keyword to search !important
  var query;

  //DOM HELP
  var DOMhelp = {

      addEvent: function(elem,evType,fn,useCapture) {

                if(elem.addEventListener) {

                   elem.addEventListener(evType,fn,useCapture); 

                } else if(elem.attachEvent) {

                       var r = elem.attachEvent('on'+evType,fn);

                  return r;     

                } else {

                    elem['on'+evType] = fn;  
                }
      },

      $: function(id){return document.getElementById(id);} 

  };//end dom help

            /*
             *
             * Create Tab Control
             * @param (String) name - name of the tab 
             * @param (Boolean) state - true for selected tab or nothing for deselected tab
             * @costrunctor TabBrowser
             *  
             */

             function TabBrowser(name,state) {

                      this.buildTab(name,state);                        
             }

             //add public method buildTab 
             TabBrowser.prototype.buildTab = function(name,state) {

                        this.tabname = name;

                        var tabbar = document.getElementById('tabbar');
 
                        var tab = document.createElement('div');

                            tab.className = 'tab';

                            tab.id = name;

                            tab.style.backgroundImage = "url(images/taboff.png)";


                      if(state) {
 
                            tab.style.backgroundImage = "url(images/tabon.png)";

                            tab.style.height = '23px'; 

                            tab.style.marginTop = '0px';

                            TabBrowser.tabn = tab.id; 
                       }


                                  //add handler for event mouseover
                                  DOMhelp.addEvent(tab,'mouseover',function(){

                                     tab.style.height = '23px'; 

                                     tab.style.marginTop = '0px'; 

                                  },false);

                                  //add handler for event mouseout
                                  DOMhelp.addEvent(tab,'mouseout',function(){

                                      if(TabBrowser.tabn != tab.id) {

                                        tab.style.backgroundImage = "url(images/taboff.png)";

                                        tab.style.height = '17px'; 

                                        tab.style.marginTop = '5px';
                                      }

                                  },false);

                                  //add handler for event click on the tab
                                  DOMhelp.addEvent(tab,'click',function(){

                                      DOMhelp.$(TabBrowser.tabn).style.backgroundImage="url(images/taboff.png)";

                                      DOMhelp.$(TabBrowser.tabn).style.height = '17px';

                                      DOMhelp.$(TabBrowser.tabn).style.marginTop = '5px'; 

                                      DOMhelp.$(TabBrowser.tabn + 'box').style.display='none';

                                      DOMhelp.$(tab.id + 'box').style.display='block';

                                      tab.style.backgroundImage = "url(images/tabon.png)";

                                      tab.style.height = '23px'; 

                                      tab.style.marginTop = '0px';
                                        
                                      TabBrowser.tabn = tab.id;  

                                  },false);

                       var text = document.createElement('div');

                           text.innerHTML = name;

                           text.setAttribute('align','center');

                           text.setAttribute('margin-top','2px');

                           tab.appendChild(text);

                           tabbar.appendChild(tab);   
 
             }//end public method

            /*
             *
             * ResultBox
             * @param (String) name of the tab 
             * @param (Boolean) state - true if tab is active or nothing if tab is inactive
             */

             function ResultBox(name,state) {

                      this.buildBox(name,state);
             }

             ResultBox.prototype.buildBox = function(name,state) {

                      var container = document.getElementById('contentbar');

                      var box = document.createElement('div');

                          box.id = name + 'box';

                          if(state) {

                             box.style.display = 'block';  

                          } else {

                             box.style.display = 'none';
                          } 

                      container.appendChild(box); 
             }

            /*
             *
             * GAjax - Google Ajax Search API
             *
             *
             */

            function GAjax(name) {

                     this.buildSearchControl(name);
            }

            //public method 
            GAjax.prototype.buildSearchControl = function(name) {

                  switch(name) {

                        case tab1name: 
                        this.search = new google.search.WebSearch(); 
                        var cseId = "016645936221120843102:hpnlgzllwts";
                        this.search.setSiteRestriction(cseId,name);
                        break;
                     

                        case tab2name: 
                        this.search = new google.search.WebSearch(); 
                        var cseId = "016645936221120843102:hpnlgzllwts";
                        this.search.setSiteRestriction(cseId,name);
                        break;

                        case tab3name: 
                        this.search = new google.search.WebSearch();
                        var cseId = "016645936221120843102:hpnlgzllwts";
                        this.search.setSiteRestriction(cseId,name);
                        break;


                        case tab4name: 
                        this.search = new google.search.WebSearch(); 
                        var cseId = "016645936221120843102:hpnlgzllwts";
                        this.search.setSiteRestriction(cseId,name);
                        break;


                  }//end switch

                  this.search.name = name;

                  this.search.setResultSetSize(GSearch.LARGE_RESULTSET);

                  this.search.setNoHtmlGeneration();

                  this.search.setSearchCompleteCallback(this, GAjax.prototype.searchComplete, [null]);

            } //end public method

            //public method 
            GAjax.prototype.execute = function(query) { this.search.execute(query); }

            //public method 
            GAjax.prototype.searchComplete = function() {

                            document.getElementById('preloader').style.display='none';

                            loader++

                            if(loader == 4){

                                document.getElementById('welcome').style.display='none';

                                document.getElementById('contentbar').style.display='block';
 
                             }

                  var resultArr = this.search.results; 

                  var panel = document.getElementById(this.search.name + 'box');

                  var resTable = document.createElement('div'); 

                  if(resultArr.length == 0) {

                           resTable.style.padding = "10px";
                           
                           resTable.innerHTML = 'Query did not match any document';

                  } else {

                           if(window.console) {console.log(resultArr);}

                     for(var i=0;i<resultArr.length;i++) {
   
                           rescontent = document.createElement('div');

                           rescontent.id = this.search.name + 'res' + i;  

                           rescontent.className = 'gsresult';

                           if((i%2)!=0) rescontent.style.background = '#f0f3f9';

                             if(this.search.name == "video") {

                                    //to DO
                             }

                           //TITLE
                           var title = document.createElement('div');

                           var link = document.createElement('a');

                               link.setAttribute('target','_blank'); 

                               link.className = 'gstitle'; 

                               link.setAttribute('href',resultArr[i].unescapedUrl); 

                               link.innerHTML = '&raquo; '+ resultArr[i].title;

                               title.appendChild(link);

                           //DESCRIPTION
                           var desc = document.createElement('div');

                               desc.id = rescontent.id + 'desc';

                               desc.className = 'gstextbox';

                               desc.innerHTML = resultArr[i].content;                          
 
                           //Bottom Link
                           var blink = document.createElement('div');

                               blink.style.padding = '2px';

                            var a = document.createElement('a');

                                a.setAttribute('target','_blank');

                                a.innerHTML = 'http://' + resultArr[i].visibleUrl;

                                a.className = 'gsvisibleUrl';

                                a.href='http://'+resultArr[i].visibleUrl; 

                                blink.appendChild(a);

                                rescontent.appendChild(title); 

                                rescontent.appendChild(desc);

                                rescontent.appendChild(blink);      



                            //###################start ADD to bookmark########################
                             var bookmark = document.createElement('div');

                             var link3 = document.createElement('a');

                                 link3.setAttribute('target','_blank');

                             var u = convertURL(resultArr[i].unescapedUrl);

                             var t = convertURL(resultArr[i].titleNoFormatting);  

                                 link3.href = 'http://www.google.com/bookmarks/mark?op=add&bkmk='+u+'&title='+t+'&annotation='+'//thinkphp.ro - Custom Search Engine!'; 

                             var img3 = document.createElement('img');

                                 with(img3) {

                                      setAttribute('alt','add bookmark');

                                      setAttribute('src','http://www.digitalinsane.com/api/google/greenlinks/add-to-google-plus.gif');

                                      setAttribute('border',0);

                                      style.border = "0";
                                 }

                                 link3.appendChild(img3);
               
                                 bookmark.appendChild(link3); 
                            //###################end ADD to bookmark########################    

              

                                rescontent.appendChild(bookmark);      

                                resTable.appendChild(rescontent); 


                                rescontent.onmouseover=function () {

                                        document.getElementById(this.id + 'desc').style.color='#000000';
                                }

                                rescontent.onmouseout=function () { 

                                        document.getElementById(this.id+'desc').style.color='#777777';
                                }

                         }//end for

                         //ADD element <a href="#">more results</a> for more results
                         var morelink = document.createElement('div');

                             morelink.setAttribute('align','right');

                         var link2 = document.createElement('a'); 

                             link2.setAttribute('target','_blank');

                             link2.href = address1 + query + more + this.search.name + address2;

                             link2.className = 'morelink';  

                         var text = document.createTextNode("more results");

                             link2.appendChild(text);

                             morelink.appendChild(link2);

                             panel.appendChild(morelink);


                  }//end if-else

               //add ALL to PANEL
               panel.appendChild(resTable); 

            }//end public method

            //public method clear results
            GAjax.prototype.clearAllResults = function() {

                  this.search.clearAllResults; 
            }


            /*
             *
             * Handler for Button Search Custom  
             *
             */

            function sendQuery() {

                 loader = 0;

                 DOMhelp.$(tab1name+'box').innerHTML='';

                 DOMhelp.$(tab2name+'box').innerHTML='';

                 DOMhelp.$(tab3name+'box').innerHTML='';

                 DOMhelp.$(tab4name+'box').innerHTML='';

                        audio.clearAllResults();

                        wikipedia.clearAllResults();

                        video.clearAllResults();

                        thinkphp.clearAllResults();

                 var n = DOMhelp.$('gsquery');

                     query = n.value;

                     if(query != '') {

                        audio.execute(query);

                        video.execute(query);

                        wikipedia.execute(query);

                        thinkphp.execute(query);

                        DOMhelp.$('sizebar').style.display="block";

                        DOMhelp.$('welcome').style.display="none";

                        DOMhelp.$('preloader').style.display='block';

                     } else {

                             clearResults();

                             DOMhelp.$('sizebar').style.display="none";

                             DOMhelp.$('welcome').style.display="block";
                     }

            }

            //clear ALL
            function clearResults() {audio.clearAllResults();wikipedia.clearAllResults();thinkphp.clearAllResults();}

            //RESET PANEL
            function resetPanel() {document.getElementById('gsquery').value='';sendQuery();document.getElementById('gsquery').value='Custom Search Engine';}


            /*
             *
             *  SetSize Buttons
             *
             */ 

            function onSize(ob) {

                     ob.className = 'sizeON';
            }

            function offSize(ob) { 
 
                     if(selectedBtn != ob) {
 
                         ob.className = 'sizeOFF';
                     } 
            }

            function hideANDshow(id,state) {

                     if(DOMhelp.$(id)) {

                        DOMhelp.$(id).style.display = state;

                     }
            }

            function switchButtonSize(ob) {

                     for(var i=1;i<=8;i++) {

                             DOMhelp.$('s'+i).className = 'sizeOFF';
                     } 

                             onSize(ob);

                             selectedBtn = ob; 
            }

            function setSize(ob) {

                     switchButtonSize(ob);

                     var x = ob.innerHTML;

                     x = x - 1;

                     for(var i=0;i<8;i++) {

                                   hideANDshow(tab1name+'res'+i,'none');  

                                   hideANDshow(tab2name+'res'+i,'none');

                                   hideANDshow(tab3name+'res'+i,'none');

                                   hideANDshow(tab4name+'res'+i,'none');


                             if(x>=i) {

                                   hideANDshow(tab1name+'res'+i,'block');  

                                   hideANDshow(tab2name+'res'+i,'block');

                                   hideANDshow(tab3name+'res'+i,'block');

                                   hideANDshow(tab4name+'res'+i,'block');
                             }
                     }                       
            } 

 
            function convertURL(url) {

                 url = url.replace(/ /g,'%20');

                 url=url.replace(/&/g,'%26');

              return url;
           }


           function secconv(sec) {

                 var w;

                 if (sec<60) w=sec+' sec';

                 if ((sec>=60) && (sec<3600))  w=((sec-(sec%60))/60)+' min '+(sec%60)+' sec';      

                 if (sec>=3600) w=((sec-(sec%3600))/3600)+' hr '+(((sec%3600)-((sec%3600)%60))/60)+' min '+(sec%3600)%60+' sec ';

             return w;
           }


            /*
             *
             * IF DOM is READY THEN init functions
             *
             */


            window.onload = function(){

                        DOMhelp.$('button').onclick = function() { 
 
                                sendQuery();

                        }//end handler for click button

                        DOMhelp.$('close').onclick = function() {

                               resetPanel();

                        }//end handler for click close

                        DOMhelp.$('gsquery').onfocus = function() {

                               document.getElementById('gsquery').value='';

                        }//end handler for focus

                        DOMhelp.$('gsquery').onkeypress = function(e) {

                                if(e) {

                                  var code = e.keyCode; 

                                 } else if(window.event){

                                    var code = window.event.keyCode; 
                                 }

                                if(code == 13) {

                                    sendQuery(DOMhelp.$('gsquery').value);

                                }
                        }//end handler for keypress

                    var box1 = new ResultBox(tab1name,true);

                    var box2 = new ResultBox(tab2name);

                    var box3 = new ResultBox(tab3name);

                    var box4 = new ResultBox(tab4name);


                    var tab1 = new TabBrowser(tab1name,true); 

                    var tab2 = new TabBrowser(tab2name);

                    var tab3 = new TabBrowser(tab3name);

                    var tab4 = new TabBrowser(tab4name);


                        audio = new GAjax(tab1name); 

                        video = new GAjax(tab2name); 

                        wikipedia = new GAjax(tab3name); 

                        thinkphp = new GAjax(tab4name); 


                    var sizebar = DOMhelp.$('sizebar');

                    var LIs = sizebar.getElementsByTagName('li');

                        for(var i=0;i<LIs.length;i++) {

                                var elem = LIs[i];

                                elem.onclick = function() { setSize(this); } 

                                elem.onmouseover = function() { onSize(this); } 

                                elem.onmouseout = function() { offSize(this); } 

                        }//endfor 

                        switchButtonSize(DOMhelp.$('s8'));

             }//end onload