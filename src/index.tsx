import { createRoot } from 'react-dom/client';
import { StrictMode, CSSProperties, useState, useCallback } from 'react';
import clsx from 'clsx';

import { Article } from './components/article/Article';
import { ArticleParamsForm } from './components/article-params-form/ArticleParamsForm';
import { defaultArticleState } from './constants/articleProps';

import './styles/index.scss';
import styles from './styles/index.module.scss';

type ArticleState = typeof defaultArticleState;

const domNode = document.getElementById('root') as HTMLDivElement;
const root = createRoot(domNode);

const App = () => {
	const [currentSettings, setCurrentSettings] =
		useState<ArticleState>(defaultArticleState);

	const handleApply = useCallback((settings: ArticleState) => {
		setCurrentSettings(settings);
	}, []);

	const handleReset = useCallback(() => {
		setCurrentSettings(defaultArticleState);
	}, []);

	return (
		<main
			className={clsx(styles.main)}
			style={
				{
					'--font-family': currentSettings.fontFamilyOption.value,
					'--font-size': currentSettings.fontSizeOption.value,
					'--font-color': currentSettings.fontColor.value,
					'--container-width': currentSettings.contentWidth.value,
					'--bg-color': currentSettings.backgroundColor.value,
				} as CSSProperties
			}>
			<ArticleParamsForm
				currentSettings={currentSettings}
				onApply={handleApply}
				onReset={handleReset}
			/>
			<Article />
		</main>
	);
};

root.render(
	<StrictMode>
		<App />
	</StrictMode>
);
