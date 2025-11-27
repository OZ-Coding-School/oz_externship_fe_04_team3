import { Button } from '@/components/common/Button'
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/common/Modal'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Separator } from '@/components/ui/separator'
import { Send } from 'lucide-react'

type ModalProps = {
  title: string
  description: string
  contents: string[] //form,card,grid등등 올 예정
}
export default function YeeunTest() {
  return (
    <div className="flex-center my-4 h-50 flex-col gap-4">
      <Dialog>
        <form>
          <DialogTrigger asChild>
            <Button variant="primary">
              <Send />
              지원하기
            </Button>
          </DialogTrigger>
          <DialogContent className="w-auto min-w-[400px] sm:max-w-2xl">
            <DialogHeader>
              <DialogTitle>스터디 지원서 작성</DialogTitle>
              <DialogDescription>
                Unity 게임 개발 프로젝트 팀원 모집
              </DialogDescription>
            </DialogHeader>

            <Separator
              style={{
                marginLeft: '-24px',
                marginRight: '-24px',
                width: 'calc(100% + 48px)',
                maxWidth: 'none',
              }}
            />
            {/* props로 전달받은 다양한 형태의 childProps컴포넌트들 */}
            <div className="grid gap-4">
              <div className="grid gap-3">
                <Label htmlFor="name-1">Name</Label>
                <Input id="name-1" name="name" defaultValue="Pedro Duarte" />
              </div>
              <div className="grid gap-3">
                <Label htmlFor="username-1">Username</Label>
                <Input
                  id="username-1"
                  name="username"
                  defaultValue="@peduarte"
                />
              </div>
            </div>

            <Separator
              style={{
                marginLeft: '-24px',
                marginRight: '-24px',
                width: 'calc(100% + 48px)',
                maxWidth: 'none',
              }}
            />

            {/* 옵셔널임  */}
            <DialogFooter>
              <DialogDescription>
                *표시된 항목은 필수 입력 사항입니다.
              </DialogDescription>
              <DialogClose asChild>
                <Button variant="outline">취소</Button>
              </DialogClose>
              <Button type="submit">
                <Send />
                지원하기
              </Button>
            </DialogFooter>
          </DialogContent>
        </form>
      </Dialog>
    </div>
  )
}
