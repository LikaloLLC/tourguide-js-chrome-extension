import React from 'react';

export const Style = () => {
  return (
    <style>{`html {
	font-size: 12px;
}

.step-container {
	background-color: #efefef
}

.card {
	min-height: 100%;
  height: fit-content;
}

.card-deck {
	overflow-x: auto;
	flex-wrap: nowrap;
	padding: 1rem;
	padding-bottom:1rem;
	height: calc(100vh - 45px);
}

.card.step {
	min-width: 260px;
	max-width: 260px;
}

.card.step:first-child {
	margin-left: 0;
}

.card.step:not(:last-child) {
	margin-right: 0;
}

.card.step .btn-icon {
	border: none;
	padding: 0;
}

.card.step .card-header {
	font-size: 80%;
	cursor: move;
}

.step-add {
	margin: auto; 
	min-height: 260px;
	width: 100%;
}

.card.disabled {
	opacity: 0.5;
	pointer-events: none;
}

.image-url-label {
	height: 24px;
	width: 20%;
}

.image-url-input {
	height: 24px;
	width: 80%;
}

.image-galley-grid {
	display: grid;
  grid-template-columns: repeat(3, 222px);
  grid-template-rows: 1fr;
  gap: 8px;
  overflow-x: hidden;
  overflow-y: scroll;
  height: 144px;
  scroll-behavior: smooth
}

.image-galley-img {
	height: 100px;
	max-width: 222px;
	margin: 0 auto;
}

.image-galley-figcaption {
	max-width: 192px;
	text-align: center;
	text-overflow: ellipsis;
	overflow: hidden;
	white-space: nowrap;
}

.image-modal-container {
  height: 100%;
}

.image-modal-container-body {
	display: flex;
  flex-direction: column;
  justify-content: space-evenly;
}

.image-modal-container-mg-top {
	margin-top: 8px;
}

.image-modal-container-hg {
	height: 136px
}

.image-picker-btn {
	width: 32px;
  height: 32px;
  position: absolute;
  top: 67px;
  right: 13px;
}

`}</style>
  );
};
