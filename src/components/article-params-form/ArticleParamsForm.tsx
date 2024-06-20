import { ArrowButton } from 'components/arrow-button';
import { Button } from 'components/button';

import styles from './ArticleParamsForm.module.scss';
import { SyntheticEvent, useRef, useState } from 'react';
import clsx from 'clsx';
import { useOutsideClickClose } from '../select/hooks/useOutsideClickClose';
import {
	ArticleStateType,
	OptionType,
	backgroundColors,
	contentWidthArr,
	defaultArticleState,
	fontColors,
	fontFamilyOptions,
	fontSizeOptions,
} from 'src/constants/articleProps';
import { Select } from '../select';
import { RadioGroup } from '../radio-group';
import { Text } from '../text';
import { Separator } from '../separator';

type ArticleParamsFormProprs = {
	currentArticleState: ArticleStateType;
	setCurrentArticleState: (params: ArticleStateType) => void;
};

export const ArticleParamsForm = ({
	currentArticleState,
	setCurrentArticleState,
}: ArticleParamsFormProprs) => {

	const [isOpen, setIsOpen] = useState(false);
	const rootRef = useRef<HTMLDivElement>(null);

	const [newFontFamily,setNewFontFamily]= useState<OptionType>(currentArticleState.fontFamilyOption)
	const [newFontColor, setNewFontColor] = useState<OptionType>(
		currentArticleState.fontColor
	);
	const [newFontSize,setNewFontSize]=useState<OptionType>(currentArticleState.fontSizeOption)
	const [newBackgroundColor,setNewBackgroundColor] = useState<OptionType>(currentArticleState.backgroundColor)
	const [newContentWidth,setNewContentWidth] = useState<OptionType>(currentArticleState.contentWidth)
	useOutsideClickClose({
		isOpen,
		rootRef,
		onClose: () => setIsOpen(!isOpen),
		onChange: setIsOpen,
	});

	const handleFormSubmit = (e:SyntheticEvent<HTMLFormElement>)=>{
		e.preventDefault();
		setCurrentArticleState({

			fontFamilyOption:newFontFamily,
			fontColor:newFontColor,
			fontSizeOption:newFontSize,
			backgroundColor:newBackgroundColor,
			contentWidth:newContentWidth,
		})
	}

	const handleFormReset = ()=>{
		setNewContentWidth(defaultArticleState.contentWidth)
		setNewFontFamily(defaultArticleState.fontFamilyOption)
		setNewFontColor(defaultArticleState.fontColor)
		setNewFontSize(defaultArticleState.fontSizeOption)
		setNewBackgroundColor(defaultArticleState.backgroundColor)
		setCurrentArticleState(defaultArticleState)
	}
	return (
		<div ref={rootRef}>
			<ArrowButton isOpen={isOpen} onClick={() => setIsOpen(!isOpen)} />
			<aside
				className={clsx(styles.container, isOpen && styles.container_open)}>
				<form onReset={handleFormReset} onSubmit={handleFormSubmit} className={styles.form}>
					<Text as={'h2'} size={31} weight={800} uppercase={true}>
						Задайте параметры
					</Text>
					<Select
						options={fontFamilyOptions}
						placeholder={newFontColor.value}
						selected={newFontFamily}
						onChange={setNewFontFamily}
						title='Шрифт'
					/>
					<RadioGroup name="fontSizeOptions" options={fontSizeOptions} selected={newFontSize} onChange={setNewFontSize} title='Размер Шрифта' />
					<Select
						options={fontColors}
						placeholder={newFontColor.value}
						selected={newFontColor}
						onChange={setNewFontColor}
						title='Цвет шрифта'
					/>
					<Separator/>
					<Select
						options={backgroundColors}
						placeholder={newBackgroundColor.value}
						selected={newBackgroundColor}
						onChange={setNewBackgroundColor}
						title='Цвет фона'
					/>
					<Select
						options={contentWidthArr}
						placeholder={newContentWidth.value}
						selected={newContentWidth}
						onChange={setNewContentWidth}
						title='Ширина контента'
					/>
					<div className={styles.bottomContainer}>
						<Button title='Сбросить' type='reset' />
						<Button title='Применить' type='submit' />
					</div>
				</form>
			</aside>
		</div>
	);
};
