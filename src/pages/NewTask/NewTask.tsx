import Container, {Body, Head, HeadMainContent, HeadSideContent} from "../../components/layout/Container";
import AddIcon from "../../assets/AddIcon.tsx";
import {RiDeleteBin5Line} from "react-icons/ri";
import {MdLoop, MdOutlineDateRange, MdWarningAmber} from "react-icons/md";
import Card, {MainContent} from "../../components/layout/Card";
import {useState} from "react";
import type {Task} from "../../types/domain.ts";

export default function NewTask() {
  const [task, setTask] = useState<Task>({})


  return (
      <form action="">
        <Container>
          <Head>
            <HeadMainContent>
              <AddIcon/>
              <input type="text" placeholder="Enter task title" required={true}/>
            </HeadMainContent>
            <HeadSideContent>
              <RiDeleteBin5Line style={{color: "#FF8989"}}/>
            </HeadSideContent>
          </Head>

          <Body>
            <label htmlFor="dateAssigned">
              <Card>
                <MainContent>
                  <MdOutlineDateRange/> <span>Assigned date:</span> <input type="date" id="dateAssigned"/>
                </MainContent>
              </Card>
            </label>

            <label htmlFor="dateDue">
              <Card>
                <MainContent>
                  <MdWarningAmber/> <span>Due date:</span> <input type="date" id="dateDue"/>
                </MainContent>
              </Card>
            </label>

            <Card>
              <MainContent>
                <MdLoop/>
                <div>
                  <label htmlFor="recurrenceStartDate">Start on <input type="date" id="recurrenceStartDate"/></label>
                  <label htmlFor="recurrencePeriod">Repeat each <input type="number" min={1} id="recurrencePeriod"/> day</label>
                  <label htmlFor="recurrenceEndDate">End on <input type="date" id="recurrenceEndDate"/></label>
                </div>
              </MainContent>
            </Card>


          </Body>
        </Container>
      </form>
  );
}