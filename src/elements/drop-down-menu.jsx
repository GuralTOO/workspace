"use client";

import React from "react";
import * as DropdownMenuPrimitive from "@radix-ui/react-dropdown-menu";
import { Check, ChevronRight, Circle } from "lucide-react";

// Styles should be defined in styles.css
// Import the stylesheet
import './styles.css';

// Components from DropdownMenuPrimitive
const {
  Root: DropdownMenu,
  Trigger: DropdownMenuTrigger,
  Group: DropdownMenuGroup,
  Portal: DropdownMenuPortal,
  Sub: DropdownMenuSub,
  RadioGroup: DropdownMenuRadioGroup,
  SubTrigger: RadixSubTrigger,
  SubContent: RadixSubContent,
  Content: RadixContent,
  Item: RadixItem,
  CheckboxItem: RadixCheckboxItem,
  RadioItem: RadixRadioItem,
  Label: RadixLabel,
  Separator: RadixSeparator,
} = DropdownMenuPrimitive;

const DropdownMenuSubTrigger = React.forwardRef((props, ref) => {
  const { className, inset, children, ...otherProps } = props;
  const combinedClassName = `dropdown-subtrigger ${inset ? "dropdown-subtrigger--inset" : ""} ${className || ""}`;
  return (
    <RadixSubTrigger ref={ref} className={combinedClassName} {...otherProps}>
      {children}
      <ChevronRight className="icon-chevron-right" />
    </RadixSubTrigger>
  );
});
DropdownMenuSubTrigger.displayName = RadixSubTrigger.displayName;

const DropdownMenuSubContent = React.forwardRef((props, ref) => {
  const { className, ...otherProps } = props;
  return (
    <RadixSubContent ref={ref} className={`dropdown-subcontent ${className || ""}`} {...otherProps} />
  );
});
DropdownMenuSubContent.displayName = RadixSubContent.displayName;

const DropdownMenuContent = React.forwardRef((props, ref) => {
  const { className, sideOffset = 4, ...otherProps } = props;
  return (
    <DropdownMenuPortal>
      <RadixContent ref={ref} sideOffset={sideOffset} className={`dropdown-content ${className || ""}`} {...otherProps} />
    </DropdownMenuPortal>
  );
});
DropdownMenuContent.displayName = RadixContent.displayName;

const DropdownMenuItem = React.forwardRef((props, ref) => {
  const { className, inset, ...otherProps } = props;
  const combinedClassName = `dropdown-item ${inset ? "dropdown-item--inset" : ""} ${className || ""}`;
  return (
    <RadixItem ref={ref} className={combinedClassName} {...otherProps} />
  );
});
DropdownMenuItem.displayName = RadixItem.displayName;

const DropdownMenuCheckboxItem = React.forwardRef((props, ref) => {
  const { className, children, checked, ...otherProps } = props;
  return (
    <RadixCheckboxItem ref={ref} className={`dropdown-checkbox-item ${className || ""}`} checked={checked} {...otherProps}>
      <span className="item-indicator">
        <Check className="icon-check" />
      </span>
      {children}
    </RadixCheckboxItem>
  );
});
DropdownMenuCheckboxItem.displayName = RadixCheckboxItem.displayName;

const DropdownMenuRadioItem = React.forwardRef((props, ref) => {
  const { className, children, ...otherProps } = props;
  return (
    <RadixRadioItem ref={ref} className={`dropdown-radio-item ${className || ""}`} {...otherProps}>
      <span className="item-indicator">
        <Circle className="icon-circle" />
      </span>
      {children}
    </RadixRadioItem>
  );
});
DropdownMenuRadioItem.displayName = RadixRadioItem.displayName;

const DropdownMenuLabel = React.forwardRef((props, ref) => {
  const { className, inset, ...otherProps } = props;
  const combinedClassName = `dropdown-label ${inset ? "dropdown-label--inset" : ""} ${className || ""}`;
  return (
    <RadixLabel ref={ref} className={combinedClassName} {...otherProps} />
  );
});
DropdownMenuLabel.displayName = RadixLabel.displayName;

const DropdownMenuSeparator = React.forwardRef((props, ref) => {
  const { className, ...otherProps } = props;
  return (
    <RadixSeparator ref={ref} className={`dropdown-separator ${className || ""}`} {...otherProps} />
  );
});
DropdownMenuSeparator.displayName = RadixSeparator.displayName;

const DropdownMenuShortcut = (props) => {
    const { className, ...otherProps } = props;
    return (
      <span className={`dropdown-shortcut ${className || ""}`} {...otherProps} />
    );
  };
  DropdownMenuShortcut.displayName = "DropdownMenuShortcut";
  
  export {
    DropdownMenu,
    DropdownMenuTrigger,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuCheckboxItem,
    DropdownMenuRadioItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuShortcut,
    DropdownMenuGroup,
    DropdownMenuPortal,
    DropdownMenuSub,
    DropdownMenuSubContent,
    DropdownMenuSubTrigger,
    DropdownMenuRadioGroup,
  };
  