Run npm install

For conflicts, resolve as follows:

Installing of shadcn components: components/ui/component >> use npx shadcn@latest add <component>

Use force for shadcn elements: They will fall under components/ui/element

For other components that conflict with react 19: use --legacy-peer-deps i.e. npm install date-fns --legacy-peer-deps
