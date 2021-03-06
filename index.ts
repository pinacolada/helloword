class Color {
    constructor(public color:number,public alpha:number) {
    }
    get rgba():string {
        return `rgba(${this.r},${this.g},${this.b},${this.alpha})`
    }
    get rgb():string {
        return `rgb(${this.r},${this.g},${this.b})`
    }
    get r():number {
        return this.color >> 16 & 0xFF
    }
    get g():number {
        return this.color >> 8 & 0xFF;
    }
    get b():number {
        return this.color && 0xFF; 
    }
}
class El {
    element:HTMLElement;
    background:Color = new Color(0xFFFFFF, 1.0);
    border = {
        color:new Color(0x000000, 1.0), 
        size: 1,
        style:"solid"
    }
    constructor(target:HTMLElement,htmlType:string, id:string) {
        this.element = document.createElement(htmlType);
        this.id = id;
        target.appendChild(this.element);
        this.setCss("position", "absolute", "boxSizing", "border-box");
    }
    setBackground(color:number, alpha:number=1.0):void {
        this.background = new Color(color, alpha);
        this.setCss("background-color", this.background.rgba);
    }
    setBorder(color:number, size:number, style:string, alpha:number=1.0):void {
        this.borderColor = color;
        this.borderAlpha = alpha;
        this.borderSize = size;
        this.borderStyle = style;
    }
    setCss(...propVal:string[]):void {
        if(propVal.length % 2 == 1) {
            throw  new RangeError("On attend un nombre pair de valeurs !");
        }
        for(let i=0; i < propVal.length; i+=2) {
            this.css.setProperty(propVal[i], propVal[i+1]);
        }
    }
    setPos(x:number, y:number):void {
        this.x = x;
        this.y = y;
    }
    setSize(width:number, height:number):void {
        this.width = width;
        this.height = height;
    }
    get css():CSSStyleDeclaration {
        return this.element.style;
    }
    get id():string {
        return this.element.id;
    }
    set id(value:string){
        this.element.id = value;
    }
    get backgroundColor():number {
        return this.background.color;
    }
    set backgroundColor(value:number) {
        this.background.color = value;
        this.setCss("background-color", this.background.rgba);
    }
    get borderColor():number {
        return this.border.color.color;
    }
    set borderColor(value:number) {
        this.border.color.color = value;
        this.setCss("border", `${this.border.size}px ${this.border.style} ${this.border.color.rgba}`);
    }
    get borderAlpha():number {
        return this.border.color.alpha;
    }
    set borderAlpha(value:number) {
        this.border.color.alpha = value;
        this.setCss("border", `${this.border.size}px ${this.border.style} ${this.border.color.rgba}`);
    }
    get borderSize():number {
        return this.border.size;
    }
    set borderSize(value:number) {
        this.border.size = value;
        this.setCss("border", `${this.border.size}px ${this.border.style} ${this.border.color.rgba}`);
    } 
    get borderStyle():string {
        return this.border.style;
    }
    set borderStyle(value:string) {
        this.border.style = value;
        this.setCss("border", `${this.border.size}px ${this.border.style} ${this.border.color.rgba}`);
    }   
    get x():number {
        let n = this.css.left;
        return n ? parseInt(n) : 0;
    }
    set x( value:number) {
        this.css.left = `${value}px`
    }
    get y():number {
        let n = this.css.top;
        return n ? parseInt(n) : 0;
    }
    set y( value:number) {
        this.css.top = `${value}px`
    }
    get width():number {
        let n = this.css.width;
        return n ? parseInt(n) : 0;
    }
    set width( value:number) {
        this.css.width = `${value}px`
    }
    get height():number {
        let n = this.css.height;
        return n ? parseInt(n) : 0;
    }
    set height(value:number) {
        this.css.height = `${value}px`
    }
}

class Frame extends El {
    /**
     * Div rectangulaire colorée
     * @param target élément html parent
     * @param divId identifiant du cadre
     * @param x gauche du cadre (en pixels)
     * @param y haut du cadre (en pixels)
     * @param w largeur du cadre (en pixels)
     * @param h hauteur du cadre (en pixels)
     * @param radius arrondi des coins (en pixels)
     */
    constructor(target:HTMLElement, divId:string, x:number, y:number, w:number, h:number, radius:number=0) {
        super(target, "DIV", divId); 
        this.setRect(x, y, w, h, radius); 
    }
    /**
     * Définit l'aspect (fond et bordure) du cadre
     * @param bgColor couleur de fond
     * @param bdrColor couleur de bordure 
     * @param bdrSize épaisseur de bordure
     * @param bdrStyle type de bordure ("solid|dotted|dashed|inset|outset|")
     * @param alpha opacité du cadre (0 = transparent ... 1 = opaque) 
     */
    setStyle(bgColor:number, bdrColor:number, bdrSize:number, bdrStyle:string, alpha:number= 1.0) {
        this.setBackground(bgColor, alpha);
        this.setBorder(bdrColor, bdrSize, bdrStyle,alpha);
    }
    /**
     * Définit la position et la taille du cadre
     * @param y haut du cadre (en pixels)
     * @param w largeur du cadre (en pixels)
     * @param h hauteur du cadre (en pixels)
     * @param radius arrondi des coins (en pixels)
     */
    setRect(x:number, y:number, w:number, h:number, radius:number=0) {
        this.setPos(x, y);
        this.setSize(w, h);
        if(radius > 0) {
           this.setCss("border-radius", `${radius}px`); 
        } else if(this.css.borderRadius !== null) {
            this.css.removeProperty("border-radius"); 
        }
    }
}

let body = document.body;
let fond = new Frame(body, "fond", 0,0,794,500);
fond.setStyle(0x9999FF,0xFFFFFF,2, "outset", 0.5);

let menu = new Frame(body, "menu", 0, 60, 150, 400, 12);
menu.setStyle(0x6666FF,0xFFFFFF,2,"outset",1);