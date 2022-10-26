/* eslint-disable */
import { useState, useEffect, forwardRef } from "react";
import { FormControl, FormLabel, FormErrorMessage } from "@chakra-ui/react";
import { EditorState, ContentState, convertToRaw } from "draft-js";
import { Container, CountTextEditor, TextEditorComponent } from "./style";
import draftToHtml from "draftjs-to-html";
import htmlToDraft from "html-to-draftjs";
import { transformHtmlToText } from "../../../utils/genericFunctions";
import sanitizeHtml from "sanitize-html";
import {
  FieldError,
  Merge,
  FieldErrorsImpl,
  Controller,
  UseFormSetValue,
  Control,
  FieldValues,
} from "react-hook-form";

interface TextEditorProps {
  htmlValue: string;
  setValue: UseFormSetValue<FieldValues>;
  error?: FieldError | Merge<FieldError, FieldErrorsImpl<any>>;
  maxLength?: number;
  nameForm: string;
  disabled?: boolean;
  label?: string;
  control: Control<FieldValues, any>;
}

const TextEditorBase = (
  {
    error,
    maxLength = 255,
    nameForm,
    disabled,
    label,
    control,
    setValue,
    htmlValue = '<p></p>'
  }: TextEditorProps,
  ref
) => {
  const [editorText, setEditorText] = useState(EditorState.createEmpty());
  const [countLength, setCountLength] = useState(0);
  
  useEffect(() => {
    const formatedValue = draftToHtml(convertToRaw(editorText.getCurrentContent()))?.trim();

    const text = transformHtmlToText(formatedValue);
    
    setCountLength(text.length);

    setValue(
      nameForm, sanitizeHtml(formatedValue, {
        allowedAttributes: {
          'span': [ 'style' ]
        },
        allowedTags: ['div', 'p', 'b', 'br', 'em', 'i', 'span', 'strong', 'ins', 'u']
      })
    );
  }, [editorText]);

  useEffect(() => {
    const formatedValue = draftToHtml(convertToRaw(editorText.getCurrentContent()))?.trim();

    if (formatedValue != htmlValue) {
      const blocksFromHtml = htmlToDraft(htmlValue);
      const { contentBlocks, entityMap } = blocksFromHtml
      const contentState = ContentState.createFromBlockArray(
        contentBlocks,
        entityMap
      )
      
      setEditorText(EditorState.createWithContent(contentState));
  
      const text = transformHtmlToText(htmlValue);
  
      setCountLength(text?.length);
    }

  }, [htmlValue])

  const getLengthOfSelectedText = () => {
    const currentSelection = editorText.getSelection();
    const isCollapsed = currentSelection.isCollapsed();

    let length = 0;

    if (!isCollapsed) {
      const currentContent = editorText.getCurrentContent();
      const startKey = currentSelection.getStartKey();
      const endKey = currentSelection.getEndKey();
      const startBlock = currentContent.getBlockForKey(startKey);
      const isStartAndEndBlockAreTheSame = startKey === endKey;
      const startBlockTextLength = startBlock.getLength();
      const startSelectedTextLength =
        startBlockTextLength - currentSelection.getStartOffset();
      const endSelectedTextLength = currentSelection.getEndOffset();
      const keyAfterEnd = currentContent.getKeyAfter(endKey);

      if (isStartAndEndBlockAreTheSame) {
        length +=
          currentSelection.getEndOffset() - currentSelection.getStartOffset();
      } else {
        let currentKey = startKey;

        while (currentKey && currentKey !== keyAfterEnd) {
          if (currentKey === startKey) {
            length += startSelectedTextLength + 1;
          } else if (currentKey === endKey) {
            length += endSelectedTextLength;
          } else {
            length += currentContent.getBlockForKey(currentKey).getLength() + 1;
          }

          currentKey = currentContent.getKeyAfter(currentKey);
        }
      }
    }

    return length;
  };

  const handleBeforeInput = () => {
    const currentContent = editorText.getCurrentContent();
    const currentContentLength = currentContent.getPlainText("").length;
    const selectedTextLength = getLengthOfSelectedText();

    if (currentContentLength - selectedTextLength > maxLength - 1) {
      return "handled";
    }
  };

  const handlePastedText = (pastedText) => {
    const currentContent = editorText.getCurrentContent();
    const currentContentLength = currentContent.getPlainText("").length;
    const selectedTextLength = getLengthOfSelectedText();

    if (
      currentContentLength + pastedText.length - selectedTextLength >
      maxLength
    ) {
      return "handled";
    }
  };

  return (
    <FormControl isInvalid={!!error}>
      {!!label && <FormLabel as="legend">{label}</FormLabel>}
      <Container hasError={!!error ? 'true' : 'false'} isDisabled={disabled ? "true" : "false"}>
        <Controller
          render={() => (
            <TextEditorComponent
              readOnly={disabled}
              toolbarHidden={disabled}
              stripPastedStyles
              ref={ref}
              toolbar={{
                options: ["inline", "colorPicker"],
                inline: {
                  inDropdown: false,
                  options: ["bold", "italic", "underline"],
                },
                colorPicker: {
                  colors: [
                    "#979cae",
                    "#000000",
                    "#272a74",
                    "#00bbdd",
                    "#52c41a",
                    "#ffec3d",
                    "#faad14",
                    "#f5222d",
                  ],
                },
              }}
              editorState={editorText}
              wrapperClassName="demo-wrapper"
              editorClassName="demo-editor"
              handleBeforeInput={handleBeforeInput}
              // @ts-ignore: Unreachable code error
              handlePastedText={handlePastedText}
              onEditorStateChange={(e) => {
                setEditorText(e);
              }}
            />
          )}
          name={nameForm}
          control={control}
        />

        {!disabled && (
          <CountTextEditor>
            {countLength}/{maxLength}
          </CountTextEditor>
        )}
      </Container>
      {!!error && (
        <FormErrorMessage>
          {typeof error?.message === "string" && error?.message}
        </FormErrorMessage>
      )}
    </FormControl>
  );
};

export const TextEditor = forwardRef(TextEditorBase);
