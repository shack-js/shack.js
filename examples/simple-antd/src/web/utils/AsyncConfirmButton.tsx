import { FC, useState } from "react"
import { Button, Modal, notification } from 'antd'

export const AsyncConfirmButton: FC<{
  buttonText: string,
  asyncFn: () => Promise<void | any>,
  confirmTitle?: string,
  confirmContent: string,
  successNotifyText?: string
}> = ({
  buttonText,
  asyncFn,
  confirmContent,
  confirmTitle = '确认',
  successNotifyText = '操作成功'
}) => {
    let [loading, setLoading] = useState(false)
    let [showModal, setshowModal] = useState(false)
    return <>
      <Button loading={loading} onClick={() => setshowModal(true)}>{buttonText}</Button>
      <Modal visible={showModal} title={confirmTitle}
        onCancel={() => setshowModal(false)}
        onOk={async () => {
          setshowModal(false)
          setLoading(true)
          try {
            await asyncFn()
            notification.success({
              placement: 'bottomRight',
              message: successNotifyText
            })
          } catch (e) {
            notification.error({
              placement: 'bottomRight',
              message: e.toString()
            })
          } finally {
            setLoading(false)
          }
        }} >
        {confirmContent}
      </Modal>
    </>
  }