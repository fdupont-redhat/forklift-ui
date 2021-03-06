import * as React from 'react';
import SimpleSelect, { OptionWithValue } from '@app/common/components/SimpleSelect';
import { MappingTarget, MappingType } from '@app/queries/types';
import { IMappingBuilderItem } from './MappingBuilder';
import { getMappingTargetName } from '../MappingDetailView/helpers';
import TruncatedText from '@app/common/components/TruncatedText';

interface IMappingTargetSelectProps {
  id: string;
  builderItems: IMappingBuilderItem[];
  itemIndex: number;
  setBuilderItems: (items: IMappingBuilderItem[]) => void;
  availableTargets: MappingTarget[];
  mappingType: MappingType;
}

const MappingTargetSelect: React.FunctionComponent<IMappingTargetSelectProps> = ({
  id,
  builderItems,
  itemIndex,
  setBuilderItems,
  availableTargets,
  mappingType,
}: IMappingTargetSelectProps) => {
  const setTarget = (target: MappingTarget) => {
    const newItems = [...builderItems];
    newItems[itemIndex] = { ...builderItems[itemIndex], target, highlight: false };
    setBuilderItems(newItems);
  };

  const targetOptions: OptionWithValue<MappingTarget>[] = availableTargets.map((target) => {
    const name = getMappingTargetName(target, mappingType);
    return {
      value: target,
      toString: () => name,
      props: {
        children: <TruncatedText>{name}</TruncatedText>,
      },
    };
  });

  const selectedOption = targetOptions.find(
    (option: OptionWithValue<MappingTarget>) =>
      option.value.selfLink === builderItems[itemIndex].target?.selfLink
  );

  return (
    <SimpleSelect
      id={id}
      aria-label="Select target"
      className="mapping-item-select"
      variant="typeahead"
      isPlain
      options={targetOptions}
      value={[selectedOption]}
      onChange={(selection) => {
        setTarget((selection as OptionWithValue<MappingTarget>).value);
      }}
      typeAheadAriaLabel="Select target..."
      placeholderText="Select target..."
    />
  );
};

export default MappingTargetSelect;
