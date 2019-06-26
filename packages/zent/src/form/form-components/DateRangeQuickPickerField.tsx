import * as React from 'react';
import { Omit } from 'utility-types';
import DateRangeQuickPicker, {
  IDateRangeQuickPickerProps,
} from '../../date-range-quick-picker';
import { DatePickers } from '../../datetimepicker/common/types';
import {
  useField,
  IFormFieldCommonProps,
  noopMapEventToValue,
  IFormComponentCommonProps,
  renderField,
} from '../shared';

export interface IFormDateRangeQuickPickerFieldProps
  extends IFormComponentCommonProps<
    DatePickers.RangeValue,
    Omit<IDateRangeQuickPickerProps, 'value'>
  > {}

function dateDefaultValueFactory(): DatePickers.RangeValue {
  return [new Date(), new Date()];
}

export const FormDateRangeQuickPickerField: React.FunctionComponent<
  IFormDateRangeQuickPickerFieldProps &
    IFormFieldCommonProps<DatePickers.RangeValue>
> = props => {
  const [childProps, { error }, ref] = useField<
    DatePickers.RangeValue,
    DatePickers.RangeValue,
    IDateRangeQuickPickerProps
  >(props, dateDefaultValueFactory, noopMapEventToValue);
  return renderField(
    props,
    error,
    ref,
    <DateRangeQuickPicker {...props.props} {...childProps} />
  );
};
