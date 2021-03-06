import Component from './component';

export default class GraphicComponent extends Component {

  constructor() {
    super();
    this._type = Component.GRAPHIC;

    /* non data properties */
    this._animator = null;
  }

  clearData() {
    this.assetName = '';
    this.priorityType = 1;
    this.opacity = 255;
    this.blendMode = 0;
    this.transparent = false;
  }

  /* -------------------Getter/Setter/Accessor-------------------------- */

  /** @param animator{Animator} */
  setAnimator(animator) {
    this._animator = animator;
  }

  /** @return {boolean} */
  isTransparent() {
    return this.transparent;
  }

  /** @param transparent {boolean} */
  setTransparent(transparent) {
    this.transparent = transparent;
  }

  /** @return {number} x position on canvas to render */
  screenX() {
    //todo use Camera instance's position
    const sx = this.getOwner().getTransform().getX();
    const tw = 48;
    return Math.round(sx * tw + tw / 2);
  }

  /** @return {number} y position on canvas to render */
  screenY() {
    const sy = this.getOwner().getTransform().getY();
    const th = 48;
    return Math.round(sy * th + th / 2);
  }

  /** @return {number} z position on canvas to render */
  screenZ() {
    return (this.priorityType << 1) + 1;
  }

  /** @return {number} x scale on canvas to render */
  screenScaleX() {
    return this.getOwner().getTransform().scale[0];
  }

  /** @return {number} y scale on canvas to render */
  screenScaleY() {
    return this.getOwner().getTransform().scale[1];
  }

  /* ------------------------------------------ */

  /** @return {number} */
  frameLength() {
    return this._animator ? this._animator.maxPattern : 1;
  }

  directionLength() {
    return this._animator ? this._animator.maxDirection : 1;
  }

  /** @return {number} */
  pattern() {
    return this._animator ? this._animator.getPattern() : 0;
  }

  direction() {
    //TODO: count by Input Bottom
    return 2;
    //return Input.dir4 === 0 ? 2 : Input.dir4; // temp
  }

  /* ------------------- Game Flow -------------------------- */

  update() {

  }

  // updateFrame() {
  //
  // }

  /* -------------------Serializable-------------------------- */

  serialize() {
    return `${this._type}: ${this.assetName} ${this.priorityType}\
 ${this.opacity} ${this.blendMode} ${+this.transparent}`;
  }

  deserialize(str) {
  }

  /* --------------------Messages--------------------------- */


}