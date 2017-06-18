var http=require('http');
var cheerio=require('cheerio');
var Promise=require('bluebird');
var baseurl='http://www.imooc.com/learn/';
var fetchCourseArray = [];
var videosId=[197,221,30,348,259];
 
videosId.forEach(function(item){
    fetchCourseArray.push(getPageAsync(baseurl+item));
});
Promise.all(fetchCourseArray).
    then(function(pages){
        var coursesData = [];
        pages.forEach(function(html){
            var courses=filterChapters(html);
            coursesData.push(courses);
        });
        coursesData.sort(function(a,b){
            return a.number< b.number;
        });
       printCourseInfo(coursesData);
    });
 
function getPageAsync(url){
    return new Promise(function(resolve,reject){
        console.log('正在爬取'+url);
        http.get(url,function(res){
            var html='';
            res.on('data',function(data){
                html+=data;
            });
            res.on('end',function(){
                resolve(html);
            });
        }).on('error',function(e){
            reject(e);
            console.log('获取课程目录出错！');
        });
    });
}
function filterChapters(html){
    var $=cheerio.load(html);
    var chapters=$('.mod-chapters .chapter');
    var title=$('.course-infos .path span').text().trim();
    var num=$($('.course-infos .statics .static-item .meta-value')[3]).text().trim();
    var chapterData={
            title: title,
            number: num,
            videos:[]
            },
        chapterItem={
            chapterTitle:'',
            videos:[]
        },videoItem={
            title:'',
            id:''
        };
 
    chapters.each(function(){
        var videoElements=$(this).find('ul.video li');
        chapterItem.chapterTitle=delwarp($(this).find('h3 strong').text().trim());
        videoElements.each(function(){
            var aElement=$(this).find('a');
            videoItem.title=delwarp(aElement.text().trim());
            videoItem.id=aElement.attr('href').split('video/')[1];
            chapterItem.videos.push(videoItem);
            videoItem={
                title:'',
                id:''
            };
        });
        chapterData.videos.push(chapterItem);
        chapterItem={
            chapterTitle:'',
            videos:[]
        }
    });
    chapterItem=null;videoItem=null;
    return chapterData;
}
function printCourseInfo(coursesData){
    coursesData.forEach(function(data){
        console.log(data.number+'评分 【'+data.title+'】\n');
    });
    coursesData.forEach(function(data){
        console.log('##'+data.title+'##');
        data.videos.forEach(function(item){
            console.log(item.chapterTitle+'\n');
            item.videos.forEach(function(list){
                console.log('    【'+list.id+'】'+list.title+'\n');
            });
        });
    });
 
}
function delwarp(str){
    var pattern=/(.+)(\s*)(.+)/g;
    return str.replace(pattern,"$1");
}
