Lottery API:
----------------------------------
-- sell lottery ticket
-- update lottery ticket
-- delete lottery ticket
-- get all tickets
-- get ticket by id
-- bulk buy (user can buy multiple ticket at a time)
-- raffle draw

Ticket:
---------------------------------- 
-- ticket number (unique)
-- username
-- price
-- timestamp

Routes:
----------------------------------
-- GET - /tickets - find all tickets
-- POST - /tickets/sell - create tickets
-- GET - /tickets/t/:ticketId - find single ticket
-- PUT - /tickets/t/:ticketId - update single ticket
-- DELETE - /tickets/t/:ticketId - delete single ticket
-- GET - /tickets/u/:username - find tickets for a given user
-- PATCH - /tickets/u/:username - patch update tickets for a given user
-- DELETE - /tickets/u/:username - delete all tickets for a given user
-- GET - /tickets/draw - raffle draw

