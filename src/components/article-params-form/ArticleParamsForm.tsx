import { ArrowButton } from 'src/ui/arrow-button';
import { Button } from 'src/ui/button';
import { useState, useRef } from 'react';
import {
	backgroundColors,
	fontFamilyOptions,
	fontSizeOptions,
	fontColors,
	contentWidthArr,
	defaultArticleState,
	ArticleStateType,
} from 'src/constants/articleProps';
import { useOutsideClickClose } from 'src/ui/select/hooks/useOutsideClickClose';
import styles from './ArticleParamsForm.module.scss';
import { clsx } from 'clsx';
import { Select } from 'src/ui/select';
import { RadioGroup } from 'src/ui/radio-group';
import { Separator } from 'src/ui/separator';

export type ArticleState = ArticleStateType;

type ArticleParamsFormProps = {
	currentSettings: ArticleState;
	onApply: (settings: ArticleState) => void;
	onReset: () => void;
};

export const ArticleParamsForm = ({
	onApply,
	onReset,
}: ArticleParamsFormProps) => {
	const [tempSettings, setTempSettings] =
		useState<ArticleState>(defaultArticleState);
	const [isPanelOpen, setIsPanelOpen] = useState<boolean>(false);

	const panelRef = useRef<HTMLDivElement>(null);

	useOutsideClickClose({
		isOpen: isPanelOpen,
		rootRef: panelRef,
		onChange: setIsPanelOpen,
	});

	/*useEffect(() => {
		if (isPanelOpen) {
			setInitialOnOpen({ ...currentSettings });
			setTempSettings({ ...currentSettings })
		}
	}, [isPanelOpen]);*/

	const handleApply = () => {
		onApply(tempSettings);
		setIsPanelOpen(false);
	};

	const handleReset = () => {
		setTempSettings({ ...defaultArticleState });
		onReset();
		setIsPanelOpen(false);
	};

	return (
		<>
			<ArrowButton
				isOpen={isPanelOpen}
				onClick={() => setIsPanelOpen((prev) => !prev)}
			/>

			{isPanelOpen && (
				<aside
					ref={panelRef}
					className={clsx(
						styles.container,
						isPanelOpen && styles.container_open
					)}>
					<form className={styles.form} onSubmit={(e) => e.preventDefault()}>
						<Select
							options={fontFamilyOptions}
							selected={tempSettings.fontFamilyOption}
							onChange={(value) =>
								setTempSettings({ ...tempSettings, fontFamilyOption: value })
							}
							title='Шрифт'
						/>
						<RadioGroup
							name='fontsize'
							options={fontSizeOptions}
							selected={tempSettings.fontSizeOption}
							onChange={(value) =>
								setTempSettings({ ...tempSettings, fontSizeOption: value })
							}
							title='Размер шрифта'
						/>
						<Select
							options={fontColors}
							selected={tempSettings.fontColor}
							onChange={(value) =>
								setTempSettings({ ...tempSettings, fontColor: value })
							}
							title='Цвет шрифта'
						/>

						<Separator />
						<Select
							options={backgroundColors}
							selected={tempSettings.backgroundColor}
							onChange={(value) =>
								setTempSettings({ ...tempSettings, backgroundColor: value })
							}
							title='Цвет фона'
						/>
						<Select
							options={contentWidthArr}
							selected={tempSettings.contentWidth}
							onChange={(value) =>
								setTempSettings({ ...tempSettings, contentWidth: value })
							}
							title='Ширина контента'
						/>

						<div className={styles.bottomContainer}>
							<Button
								title='Сбросить'
								htmlType='button'
								type='clear'
								onClick={handleReset}
							/>
							<Button
								title='Применить'
								htmlType='button'
								type='apply'
								onClick={handleApply}
							/>
						</div>
					</form>
				</aside>
			)}
		</>
	);
};
