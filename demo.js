$(function() {
  init();
});
var graph = null;
var paper = null;
function init() {
  graph = new joint.dia.Graph();
  paper = new joint.dia.Paper({
    el: document.getElementById("paper"),
    width: 800,
    height: 1000,
    model: graph,
    defaultConnectionPoint: { name: "boundary" },
    defaultConnector: { name: "smooth" },
    interactive: { linkMove: false },
    // frozen: true
  });
  graph.on('add', function(cell){
    console.log('add cell==='+cell.id);
  });
  // 圆
  var circle1 = new joint.shapes.standard.Circle();
  circle1.resize(100,100);
  circle1.position(10,10);
  circle1.attr('root/title', 'joint.shapes.standard.Circle');
  circle1.attr('label/text', 'Circle');
  circle1.attr('body/fill', 'lightblue');
  circle1.addTo(graph);
  // 图片+边框
  var borderedImage = new joint.shapes.standard.BorderedImage();
  borderedImage.resize(100, 100);
  borderedImage.attr('root/title', 'joint.shapes.standard.borderImage');
  borderedImage.attr('label/text', 'BorderedImage');
  borderedImage.attr('border/rx', 5);
  borderedImage.attr('image/xlinkHref', './imgs/logo.png');
  graph.addCell(borderedImage);
  borderedImage.position(120,10);
  // 圆柱
  var cylinder = new joint.shapes.standard.Cylinder();
  cylinder.resize(50, 100);
  cylinder.position(230,10);
  cylinder.attr('root/title', 'joint.shapes.standard.Cylinder');
  cylinder.attr('body/fill', 'lightgray');
  cylinder.attr('top/fill', 'gray');
  cylinder.attr('label/text', 'Cylinder');
  cylinder.addTo(graph);
  // 双边箭头
  var doubleLink = new joint.shapes.standard.DoubleLink();
  doubleLink.prop('source', {x:300,y:20});
  doubleLink.prop('target', {x:400,y:100});
  doubleLink.prop('vertices', [{x:350,y:30}]);
  doubleLink.attr('root/title', 'joint.shapes.standard.DoubleLink');
  doubleLink.attr('link/stroke', '#30d0c6');
  doubleLink.addTo(graph);
  // 椭圆
  var ellipse = new joint.shapes.standard.Ellipse();
  ellipse.resize(100,60);
  ellipse.position(410,20);
  ellipse.attr('root/title', 'joint.shapes.standard.Ellipse');
  ellipse.attr('label/text', '椭圆');
  ellipse.attr('body/fill', 'lightblue');
  ellipse.addTo(graph);
  // 内嵌图片
  var embeddedImage = new joint.shapes.standard.EmbeddedImage();
  embeddedImage.resize(100,100);
  embeddedImage.position(520,10);
  embeddedImage.attr('root/title', 'joint.shapes.standard.EmbeddedImage');
  // embeddedImage.attr('label/text', 'EmbeddedImage');
  embeddedImage.attr('image/x', 0);
  embeddedImage.attr('image/y', 0);
  embeddedImage.attr('image/refWidth',1);
  embeddedImage.attr('image/refHeight',1);
  embeddedImage.attr('image/xlinkHref', './imgs/logo.png');
  embeddedImage.addTo(graph);
  // 矩形带头部
  var headeredRectangle = new joint.shapes.standard.HeaderedRectangle();
  headeredRectangle.resize(150, 100);
  headeredRectangle.position(630,10);
  headeredRectangle.attr('root/title', 'joint.shapes.standard.HeaderedRectangle');
  headeredRectangle.attr('headerText/text', 'Header');
  headeredRectangle.attr('bodyText/text', 'Hea\\Rec...');
  headeredRectangle.attr('header/fill', 'lightgray');
  headeredRectangle.addTo(graph);
  // 图片
  var image = new joint.shapes.standard.Image();
  image.resize(100,100);
  image.position(10,150);
  image.attr('image/xlinkHref', './imgs/logo.png');
  image.attr('label/text', '图片');
  image.addTo(graph);
  // 图片+圆形边框
  var inscribedImage = new joint.shapes.standard.InscribedImage();
  inscribedImage.resize(100,100);
  inscribedImage.position(150,150);
  inscribedImage.attr('image/xlinkHref', './imgs/logo.png');
  inscribedImage.attr('label/text', '内切图片');
  inscribedImage.addTo(graph);
  // 箭头
  var link = new joint.shapes.standard.Link();
  link.prop('source',image);
  link.prop('target',{id:inscribedImage.id});
  link.attr('line/stroke', '#fe854f');
  link.attr('rectSelector', { atConnectionLengthIgnoreGradient: 30, width: 10, height: 10, fill: 'blue' });
  link.addTo(graph);
  var linkReverse = new joint.shapes.standard.Link();
  linkReverse.prop('source',inscribedImage);
  linkReverse.prop('target',image);
  linkReverse.attr('line/stroke', '#fe854f');
  linkReverse.addTo(graph);
  return;
  var start = initState(50, 530);
  var code = state(180, 390, "code");
  var slash = state(340, 220, "slash");
  var star = state(600, 400, "star");
  var line = state(190, 100, "line");
  var block = state(560, 140, "block");

  link(start, code, "start");
  link(code, start, "return");
  link(code, slash, "/");
  link(slash, code, "other", [{ x: 270, y: 300 }]);
  link(slash, line, "/");
  link(line, code, "new\n line");
  link(slash, block, "*");
  link(block, star, "*");
  link(star, block, "other", [{ x: 650, y: 290 }]);
  link(star, code, "/", [{ x: 490, y: 310 }]);
  link(line, line, "other", [{ x: 115, y: 100 }, { x: 250, y: 50 }]);
  link(block, block, "other", [{ x: 485, y: 140 }, { x: 620, y: 90 }]);
  link(code, code, "other", [{ x: 180, y: 500 }, { x: 305, y: 450 }]);

  paper.unfreeze();
}

function state(x, y, label) {
  var circle = new joint.shapes.standard.Circle({
    position: { x: x, y: y },
    size: { width: 60, height: 60 },
    attrs: {
      label: {
        text: label,
        fontWeight: "bold"
      },
      body: {
        strokeWidth: 3
      }
    }
  });
  return circle.addTo(graph);
}

function initState(x, y) {
  var start = new joint.shapes.standard.Circle({
    position: { x: x, y: y },
    size: { width: 20, height: 20 },
    attrs: {
      body: {
        fill: "#333333"
      }
    }
  });
  return start.addTo(graph);
}

function link(source, target, label, vertices) {
  var link = new joint.shapes.standard.Link({
    source: { id: source.id },
    target: { id: target.id },
    attrs: {
      line: {
        strokeWidth: 2
      }
    },
    labels: [
      {
        position: {
          distance: 0.5,
          offset: label.indexOf("\n") > -1 || label.length === 1 ? 0 : 10,
          args: {
            keepGradient: true,
            ensureLegibility: true
          }
        },
        attrs: {
          text: {
            text: label,
            fontWeight: "bold"
          }
        }
      }
    ],
    vertices: vertices || []
  });
  return link.addTo(graph);
}
