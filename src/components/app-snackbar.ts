/**
 * Copyright (c) IBM and its affiliates.
 *
 * This source code is licensed under the MIT license found in the LICENSE.txt
 * file in the root directory of this source tree.
 */

import { LitElement, html, css, customElement } from 'lit-element';

@customElement('app-snackbar')
export class AppSnackbar extends LitElement {
  static get styles() {
    return [
      css`
        :host {
          display: flex;
          min-width: 288px;
          margin: 12px;
          padding: 14px 16px;
          box-sizing: border-box;
          background-color: #333333;
          border-radius: 4px;
          position: fixed;
          bottom: 0;
        }

        .message {
          flex-grow: 1;
          color: #ffffff;
        }
      `
    ];
  }

  protected render() {
    return html`
      <div class="message">New version available!</div>
      <button @click=${this._onAccept}>Update</button>
      <button @click=${this._onCancel}>X</button>
    `;
  }

  protected _onAccept() {
    const onAcceptEvent = new CustomEvent('on-accept');
    this.dispatchEvent(onAcceptEvent);
  }

  protected _onCancel() {
    const onCancelEvent = new CustomEvent('on-cancel');
    this.dispatchEvent(onCancelEvent);
  }
}