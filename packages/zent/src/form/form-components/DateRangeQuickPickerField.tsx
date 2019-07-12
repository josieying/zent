import * as React from 'react';
import { Omit } from 'utility-types';
import DateRangeQuickPicker, {
  IDateRangeQuickPickerProps,
} from '../../date-range-quick-picker';
import { DatePickers } from '../../datetimepicker/common/types';
import {
  useField,
  noopMapEventToValue,
  IFormComponentCommonProps,
  IFormFieldModelProps,
} from '../shared';
import { FormField } from '../Field';

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
    IFormFieldModelProps<DatePickers.RangeValue>
> = props => {
  const [childProps, { error }, ref] = useField<
    DatePickers.RangeValue,
    DatePickers.RangeValue,
    IDateRangeQuickPickerProps
  >(props, dateDefaultValueFactory, noopMapEventToValue);
  return (
    <FormField ref={ref} {...props} error={error}>
      <DateRangeQuickPicker {...props.props} {...childProps} />
    </FormField>
  );
};
