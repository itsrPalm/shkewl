import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

type GlassModalProps = {
  trigger: JSX.Element;
  children: React.ReactNode;
  title: string;
  description: string;
};

export const GlassModal = ({
  trigger,
  children,
  title,
  description,
}: GlassModalProps) => {
  return (
    <Dialog>
      <DialogTrigger asChild>{trigger}</DialogTrigger>
      <DialogContent
        aria-describedby="dialog-description"
        className="bg-clip-padding backdrop-filter backdrop--blur__safari backdrop-blur-3xl bgOpacity-20 bg-themeGray border-themeGray"
      >
        <DialogHeader>
          <DialogTitle>{title}</DialogTitle>
          <DialogDescription>{description}</DialogDescription>
        </DialogHeader>
        {children}
      </DialogContent>
    </Dialog>
  );
};
