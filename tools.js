// Should work for most cases
function uniqId() {
  return 'id_'+Math.round(new Date().getTime() + (Math.random() * 100));
}

function createElement(type, attrs) {
    if (attrs === undefined) {
        attrs = {};
    }
    if (!attrs.hasOwnProperty('id')) {
        attrs['id'] = uniqId();
    }
    var element = $(document.createElement(type));
    $.each(attrs, (k,v) => {
        element.attr(k, v);
    });
    return element;
}


function setSectionTable(table, columns, section_name) {
    var section = $(document.createElement(section_name));
    var tr = $(document.createElement('tr'));
    $.each(columns, (idx,column) => {
        var th = $(document.createElement('th'));
        th.html(column);
        tr.append(th);
    });
    section.html(tr);
    if ($(section_name, table).length > 1) {
        $(section_name, table).html(section);
    } else {
        table.prepend(section);
    }
}


function setTbody(table) {

    var tbody = $(document.createElement('tbody'));
    if ($('tbody', table).length > 1) {
        $('tbody', table).html(section);
    } else {
        table.prepend(tbody);
    }
}

function setThead(table, columns) {
    setSectionTable(table, columns, 'thead');
}

function setTfoot(table, columns) {
    setSectionTable(table, columns, 'tfoot');
}

function ajaxDatatableList(id_render, url) {
    
    var table = createElement('table', {
        class: 'table table-hover demo-table-search'
    });    

    $.ajax({
        url: url,
        success: (response) => {
            var columns = (function() {
                var cols=[];
                $.each(response[0], (k,v) => {
                    cols.push(k);
                }); 
                return cols;
            })();
            setTbody(table);
            setThead(table, columns);
            $('#'+id_render).html(table);
            var settings = {
                data: (function() {
                    var values=[];
                    $.each(response, (idx,row) => {
                        var val_arr = [];
                        $.each(row, (k,v) =>{
                            val_arr.push(v);
                        });
                        values.push(val_arr);
                    }); 
                    return values;
                })(),
                destroy: true,
                scrollCollapse: true,
                oLanguage: {
                    sLengthMenu: "_MENU_ ",
                    sInfo: "Showing <b>_START_ to _END_</b> of _TOTAL_ entries"
                },
                iDisplayLength: 5
            }
            table.dataTable(settings);
        }
    });
}

(function( $ ){
   $.fn.submit_form_ajax = function() {
       $(this).submit(function(e){
           var form = $(this);
           if (form.attr("data-msg")) {
            toastr["info"](form.attr("data-msg"));
           }
           var action = form.attr('action');
           var method = form.attr('method');
           var data = form.serialize();
           $.ajax({
               type: method,
               url: action,
               data: data,
               error: function(result) {
                   form.children('.callback').prepend(result.responseText);
                    toastr["error"]("Falha na solicitação");
               },
               success: function(result) {
                  if (result['code'] != 200) {
                      form.find('.callback').prepend(alert_bootstrap("danger", true, true, result['message']));
                      form[0].reset();
                      toastr["error"]("Falha na solicitação");
                  } else if (result['code'] == 200) {
                      if (result.hasOwnProperty('redirect_to')){
                         window.location = result['redirect_to']
                      }
                      if (result.hasOwnProperty('message')){
                          form.children('.callback').prepend(alert_bootstrap("success", true, true, result['message']));
                          toastr["success"](result['message']);
                      }
                  }
                }
             });
             e.preventDefault();
        });
   };
})( jQuery );

// using jQuery
function getCookie(name) {
    var cookieValue = null;
    if (document.cookie && document.cookie !== '') {
        var cookies = document.cookie.split(';');
        for (var i = 0; i < cookies.length; i++) {
            var cookie = jQuery.trim(cookies[i]);
            // Does this cookie string begin with the name we want?
            if (cookie.substring(0, name.length + 1) === (name + '=')) {
                cookieValue = decodeURIComponent(cookie.substring(name.length + 1));
                break;
            }
        }
    }
    return cookieValue;
}
function csrfSafeMethod(method) {
    return (/^(GET|HEAD|OPTIONS|TRACE)$/.test(method));
}
$.ajaxSetup({
    beforeSend: function(xhr, settings) {
        if (!csrfSafeMethod(settings.type) && !this.crossDomain) {
            xhr.setRequestHeader("X-CSRFToken", getCookie('csrftoken'));
        }
    }
});

function overlay_loading(texto) {
    div = '<div id="overlay" class="overlay-loading" style="display: block">'+
             '<div class="button-container" >'+
             '   <div class="fab" id="loading" style="width: 150px; margin: 5% auto;">'+
                 '   <?xml version="1.0" standalone="no"?>'+
                 '   <!DOCTYPE svg PUBLIC "-//W3C//DTD SVG 1.1//EN" "http://www.w3.org/Graphics/SVG/1.1/DTD/svg11.dtd">'+
                 '   <svg id="SVG-Circus-76df5ed3-ce3f-f186-9aaf-c0b21f53d926" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" viewBox="0 0 100 100" preserveAspectRatio="xMidYMid meet"><circle id="actor_3" cx="50" cy="73" r="5" opacity="1" fill="rgba(168,12,242,1)" fill-opacity="1" stroke="rgba(94,3,166,1)" stroke-width="1" stroke-opacity="1" stroke-dasharray=""></circle><circle id="actor_2" cx="50" cy="75" r="5" opacity="1" fill="rgba(168,12,242,1)" fill-opacity="1" stroke="rgba(94,3,166,1)" stroke-width="1" stroke-opacity="1" stroke-dasharray=""></circle><circle id="actor_1" cx="50" cy="75" r="5" opacity="1" fill="rgba(168,12,242,1)" fill-opacity="1" stroke="rgba(94,3,166,1)" stroke-width="1" stroke-opacity="1" stroke-dasharray=""></circle><script type="text/ecmascript"><![CDATA[(function(){var actors={};actors.actor_1={node:document.getElementById("SVG-Circus-76df5ed3-ce3f-f186-9aaf-c0b21f53d926").getElementById("actor_1"),type:"circle",cx:50,cy:75,dx:10,dy:27,opacity:1};actors.actor_2={node:document.getElementById("SVG-Circus-76df5ed3-ce3f-f186-9aaf-c0b21f53d926").getElementById("actor_2"),type:"circle",cx:50,cy:75,dx:10,dy:27,opacity:1};actors.actor_3={node:document.getElementById("SVG-Circus-76df5ed3-ce3f-f186-9aaf-c0b21f53d926").getElementById("actor_3"),type:"circle",cx:50,cy:73,dx:10,dy:27,opacity:1};var tricks={};tricks.trick_1=(function(_,t){t=(function(n){return.5>n?2*n*n:-1+(4-2*n)*n})(t)%1,t=t*4%1,t=0>t?1+t:t;var a=(_.node,-25*Math.cos(-90*Math.PI/180)),i=25*Math.sin(-90*Math.PI/180);a+=25*Math.cos((-90-360*t*1)*Math.PI/180),i-=25*Math.sin((-90-360*t*1)*Math.PI/180),_._tMatrix[4]+=a,_._tMatrix[5]+=i});tricks.trick_2=(function(t,i){i=(function(n){return.5>n?2*n*n:-1+(4-2*n)*n})(i)%1,i=0>i?1+i:i;var _=t.node;0.1>=i?_.setAttribute("opacity",i*(t.opacity/0.1)):i>=0.9?_.setAttribute("opacity",t.opacity-(i-0.9)*(t.opacity/(1-0.9))):_.setAttribute("opacity",t.opacity)});var scenarios={};scenarios.scenario_1={actors: ["actor_1","actor_2","actor_3"],tricks: [{trick: "trick_1",start:0,end:1},{trick: "trick_2",start:0,end:1}],startAfter:0,duration:6000,actorDelay:300,repeat:0,repeatDelay:1000};var _reqAnimFrame=window.requestAnimationFrame||window.mozRequestAnimationFrame||window.webkitRequestAnimationFrame||window.oRequestAnimationFrame,fnTick=function(t){var r,a,i,e,n,o,s,c,m,f,d,k,w;for(c in actors)actors[c]._tMatrix=[1,0,0,1,0,0];for(s in scenarios)for(o=scenarios[s],m=t-o.startAfter,r=0,a=o.actors.length;a>r;r++){if(i=actors[o.actors[r]],i&&i.node&&i._tMatrix)for(f=0,m>=0&&(d=o.duration+o.repeatDelay,o.repeat>0&&m>d*o.repeat&&(f=1),f+=m%d/o.duration),e=0,n=o.tricks.length;n>e;e++)k=o.tricks[e],w=(f-k.start)*(1/(k.end-k.start)),tricks[k.trick]&&tricks[k.trick](i,Math.max(0,Math.min(1,w)));m-=o.actorDelay}for(c in actors)i=actors[c],i&&i.node&&i._tMatrix&&i.node.setAttribute("transform","matrix("+i._tMatrix.join()+")");_reqAnimFrame(fnTick)};_reqAnimFrame(fnTick);})()]]></script></svg>'+
             '   </div>'+
             '   <h1></h1>'+
          '   </div>'+
          '   </div>';

   if ($('.overlay-loading').length == 0) {
      $("body").append(div);
   }
   $('.overlay-loading h1').html(texto);

   if ($('.overlay-loading').css('display') == 'block')
       $('.overlay-loading').fadeOut();
   else
       $('.overlay-loading').fadeIn();

}

