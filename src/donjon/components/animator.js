import Component from './component';
import Input from '../core/input';

export default class Animator extends Component {

  constructor() {
    super();
    this._type = Component.ANIMATOR;

    this._stopCount = 0;
    this._pattern = 0;
    this._animationCount = 0;
  }

  clearData(data) {
    super.clearData();
    this.speed = 3;
    this.maxDirection = 4;
    this.maxPattern = 4;
    this.walkAnime = true;
    this.stepAnime = false;

    this._stopCount = 0;
    this._pattern = 0;
    this._animationCount = 0;
  }

  /* ------------------- Game Flow -------------------------- */

  update() {
    if (this.isStopping()) {
      //this.updateStop();
    }
    this.updateAnimationCount();
    if (this._animationCount >= this.animationWait()) {
      this.updatePattern();
      this._animationCount = 0;
    }
  }

  resetStopCount() {
    this._stopCount = 0;
  }

  updateStop() {
    this._stopCount++;
  }

  /** @private */
  updateAnimationCount() {
    if (this.isMoving() && this.walkAnime) //  &&
      this._animationCount += 1.5;
    else if (this.stepAnime)
      this._animationCount++;
  }

  /** @private */
  updatePattern() {
    if (this._stopCount > 0) {
      this.resetPattern();
    } else {
      this._pattern = (this._pattern + 1) % this.maxPattern;
    }
  }

  /** @private */
  animationWait() {
    return (9 - this.speed) * 3;
  }

  /** @private */
  resetPattern() {
    this._pattern = 0;
  }

  /** @private */
  setPattern(pattern) {
    this._pattern = pattern;
  }

  /** @private */
  getPattern() {
    return this._pattern;
  }

  isMoving() {
    return Input.dir4 !== 0;
  }

  isStopping() {
    return Input.dir4 === 0;
  }

  /* -------------------Serializable-------------------------- */

  serialize() {

  }

  deserialize(str) {

  }

  /* --------------------Messages--------------------------- */

  onInstantiate(msg) {
    super.onInstantiate(msg);
    /* Animator must have a GraphicComp */
    this._graphicComp = this._owner.getGraphicComp();
    if (this._graphicComp) {
      this._graphicComp.setAnimator(this);
    } else {
      console.log("Cannot!!!!!!!!");
    }
  }
}