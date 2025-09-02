import { ArrowButton } from 'src/ui/arrow-button';
import { Button } from 'src/ui/button';
import { Text } from 'src/ui/text';
import { useState, useRef, useEffect } from 'react';
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
	currentSettings,
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

	useEffect(() => {
		if (isPanelOpen) {
			setTempSettings({ ...currentSettings });
		}
	}, [isPanelOpen, currentSettings]);

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

			<aside
				ref={panelRef}
				className={clsx(styles.container, {
					[styles.container_open]: isPanelOpen,
				})}>
				<form
					className={styles.form}
					onSubmit={(e) => {
						e.preventDefault();
						handleApply();
					}}>
					<Text weight={800} size={31} uppercase>
						Задайте параметры
					</Text>
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
						<Button title='Применить' htmlType='submit' type='apply' />
					</div>
				</form>
			</aside>
		</>
	);
};
