import {
  extension,
  ApplySchemaAttributes, 
  MarkSpecOverride,
  MarkExtensionSpec,
  PrimitiveSelection,
  CommandFunction,
  ExtensionTag,
  MarkExtension,
  command,
  toggleMark,
  getTextSelection,
} from "@remirror/core";

export interface KeyboardOptions {};

@extension<KeyboardOptions>({ defaultOptions: {}})
export default class KeyboardExtension extends MarkExtension<KeyboardOptions> {
  get name() {
    return "kbd";
  }

  createTags() {
    return [ExtensionTag.FormattingMark, ExtensionTag.FontStyle];
  }

  createMarkSpec(extra: ApplySchemaAttributes, override: MarkSpecOverride): MarkExtensionSpec {
    return {
      ...override,
      attrs: extra.defaults(),
      parseDOM: [
        {
          tag: "kbd",
          getAttrs: extra.parse,
        },
        ...(override.parseDOM ?? []),
      ],
      toDOM: (node) => {
        return ["kbd", extra.dom(node), 0];
      },
    };
  }

  @command()
  toggleKeyboard(selection: PrimitiveSelection): CommandFunction {
    return toggleMark({ type: this.type, selection });
  }

  @command()
  setKeyboard(selection: PrimitiveSelection): CommandFunction {
    return ({ tr, dispatch }) => {
      const { from, to } = getTextSelection(selection ?? tr.selection, tr.doc);
      dispatch?.(tr.addMark(from, to, this.type.create()));

      return true;
    };
  }

  @command()
  removeKeyboard(selection: PrimitiveSelection): CommandFunction {
    return ({ tr, dispatch }) => {
      const { from, to } = getTextSelection(selection ?? tr.selection, tr.doc);

      if (!tr.doc.rangeHasMark(from, to, this.type)) {
        return false;
      }

      dispatch?.(tr.removeMark(from, to, this.type));

      return true;
    };
  }
}
