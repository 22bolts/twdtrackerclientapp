import FormGroup from '@/app/shared/form-group';
import { Checkbox } from '@/components/ui/checkbox';
import { DatePickerWrapper } from '@/components/ui/datepicker';
import { Input } from '@/components/ui/input';
import cn from '@/utils/class-names';
import { Controller, useFormContext } from 'react-hook-form';

export default function DeliveryEvent({ className }: { className?: string }) {
  const {
    register,
    control,
    formState: { errors },
  } = useFormContext();
  return (
    <FormGroup
      title="Delivery / Event Date"
      description="Add delivery or vent Date here"
      className={cn(className)}
    >
      <Controller
        name="isPurchaseSpecifyDate"
        control={control}
        render={({ field: { value, onChange } }) => (
          <Checkbox
            value={value}
            checked={value}
            onChange={onChange}
            label="Yes, customers must specify a date to purchase this product"
            className="col-span-full"
          />
        )}
      />
      <Input
        label="Date Field Name"
        placeholder="Date Field Name"
        className="col-span-full"
        {...register('dateFieldName')}
        error={errors.dateFieldName?.message as string}
      />
      <Controller
        name="isLimitDate"
        control={control}
        render={({ field: { value, onChange } }) => (
          <Checkbox
            value={value}
            checked={value}
            onChange={onChange}
            label="I want to limit the date range"
            className="col-span-full"
          />
        )}
      />
      <Controller
        name="availableDate"
        control={control}
        render={({ field: { value, onChange, onBlur } }) => (
          <DatePickerWrapper
            value={value}
            onChange={onChange}
            dateFormat="MMM, yyyy"
            placeholderText="Select Month"
            showMonthYearPicker
            popperPlacement="bottom-end"
            inputProps={{
              variant: 'text',
              inputClassName: 'p-0 px-1 h-auto [&_input]:text-ellipsis',
            }}
            className="w-36"
          />
        )}
      />
      <Controller
        name="endDate"
        control={control}
        render={({ field: { value, onChange, onBlur } }) => (
          <DatePickerWrapper
            value={value}
            onChange={onChange}
            dateFormat="MMM, yyyy"
            placeholderText="Select Month"
            showMonthYearPicker
            popperPlacement="bottom-end"
            inputProps={{
              variant: 'text',
              inputClassName: 'p-0 px-1 h-auto [&_input]:text-ellipsis',
            }}
            className="w-36"
          />
        )}
      />
      <Controller
        name="endDate"
        control={control}
        render={({ field: { value, onChange, onBlur } }) => (
          <DatePickerWrapper
            value={value}
            onChange={onChange}
            dateFormat="MMM, yyyy"
            placeholderText="Select Month"
            showMonthYearPicker
            popperPlacement="bottom-end"
            inputProps={{
              variant: 'text',
              inputClassName: 'p-0 px-1 h-auto [&_input]:text-ellipsis',
            }}
            className="w-36"
          />
        )}
      />

        
    </FormGroup>
  );
}
