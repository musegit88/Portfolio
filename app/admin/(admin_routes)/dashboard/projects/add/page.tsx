"use client";

import { Checkbox } from "@/components/ui/checkbox";
import {
  Field,
  FieldGroup,
  FieldLabel,
  FieldLegend,
  FieldSet,
} from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import {
  MultiSelect,
  MultiSelectContent,
  MultiSelectGroup,
  MultiSelectItem,
  MultiSelectTrigger,
  MultiSelectValue,
} from "@/components/ui/multi-select";
import { Textarea } from "@/components/ui/textarea";
import { webDevTechs } from "@/lib/constants";
import Form from "../../../_components/form";

const CreateProjectPage = () => {
  return (
    <div className="my-4 w-full max-w-4xl mx-auto">
      <Form />
    </div>
  );
};

export default CreateProjectPage;
