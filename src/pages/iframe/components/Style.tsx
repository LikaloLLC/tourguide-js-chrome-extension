import React from 'react';

export const Style = () => {
  return (
    <style>{`html {
	font-size: 12px;
}

.step-container {
	background-color: #efefef
}

.card-deck {
	overflow-x: auto;
	flex-wrap: nowrap;
	padding: 1rem;
	padding-bottom:1rem;
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

.card.step:last-child {
	min-width: 200px;
	max-width: 200px;
}

.card.step .btn-icon {
	border: none;
	padding: 0;
}

.card.step .card-header {
	font-size: 80%;
	
}

.card.disabled {
	opacity: 0.5;
	pointer-events: none;
}`}</style>
  );
};
